import React from 'react';
//import logo from '../logo.svg';
import '../../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import { Table, Button, Container, Modal, ModalBody, ModalHeader, FormGroup, ModalFooter  } from 'reactstrap';
import {Form} from 'react-bootstrap';
import './Listar.css';

import Admin from '../../Request/admin';

//const [users, setUsers] = useState(null);
//const data = ListarUsers;
//console.log(data);
export class TablaUser extends React.Component {

  constructor() {
    super();
    this.mostrarModalActualizar = this.mostrarModalActualizar.bind(this);
    this.eliminar = this.eliminar.bind(this);
  }
  state = {
    data: [],
    modalActualizar: false,
    modalInsertar: false,
    form: {
      _id: "",
      username: "",
      email: "",
      name: "",
      type_user: "",
      maxsize: "",

    },
  };

  mostrarModalActualizar = (dato) => {
    this.setState({
      form: dato,
      modalActualizar: true,
    });
  };

  cerrarModalActualizar = () => {
    this.setState({ modalActualizar: false });
  };

  mostrarModalInsertar = () => {
    this.setState({
      modalInsertar: true,
    });
  };

  cerrarModalInsertar = () => {
    this.setState({ modalInsertar: false });
  };

  editar = (dato) => {
    var contador = 0;
    var arreglo = this.state.data;

    //promesa
    Admin.EditUser(dato._id, dato.maxsize)

      .then(data => {
        arreglo.map((registro) => {
          if (dato._id == registro._id) {

            arreglo[contador].maxsize = dato.maxsize;

          }
          contador++;
        });
        this.setState({ data: arreglo, modalActualizar: false });

      })

  };

  eliminar = (dato) => {
    var opcion = window.confirm("Estás Seguro que deseas Eliminar el elemento " + dato.username);
    if (opcion == true) {
      var contador = 0;
      var arreglo = this.state.data;
      //promesa
      Admin.DeleteUser(dato._id)
        .then(data => {
          arreglo.map((registro) => {
            if (dato._id == registro._id) {
              arreglo.splice(contador, 1);
            }
            contador++;
          });
          this.setState({ data: arreglo, modalActualizar: false });

        })


    }
  };

  insertar = () => {
    var valorNuevo = { ...this.state.form };
    // valorNuevo.id=this.state.data.length+1;//Nuevo id

    // Admin.CreateUser("Sebas",
    // "fernando7829@hotmail.com",
    // "sebas",
    // "ADMIN",
    //5)
    // promesa
    Admin.CreateUser(valorNuevo.username,
      valorNuevo.email,
      valorNuevo.name,
      valorNuevo.type_user,
      parseInt(valorNuevo.maxsize)
    )
      .then(data => {
        // var lista = this.state.data;
        // lista.push(valorNuevo);
        this.setState({ modalInsertar: false});
        this.getListUser()
      });



  }
  // syncUser = () => {
  //   ListarUsers.then(
  //     array => setUsers(array))
  // }

  handleChange = (e) => {
    this.setState({
      form: {
        ...this.state.form,
        [e.target.name]: e.target.value,
      },
    });
  };

  getListUser = () => {
    Admin.getUser().then(res => {
      this.setState({ ...this.state, data: res.data.users })
    });
  }


  componentDidMount() {
    this.getListUser()
  }
 

  render() {


    const tabladinamica = this.state.data.map(dato =>
      <RegistroFila dato={dato}
        key={dato._id}
        mostrarModalActualizar={this.mostrarModalActualizar}
        eliminar={this.eliminar} />);

    /*  console.log(this.state.data,
       "imprimeintp"
       ) */
    return (
      <>
        <Container>
          <br />
          <Button color="success" onClick={() => this.mostrarModalInsertar()}>Crear</Button>
          <br />
          <br />
          <div className="view-users">
            <Table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Username</th>
                  <th>Email</th>
                  <th>Name</th>
                  <th>Type_user</th>
                  <th>Maxsize</th>
                  <th>Acción</th>
                </tr>
              </thead>
              <tbody>
                {tabladinamica}
              </tbody>
            </Table>
          </div>
        </Container>

        <Modal isOpen={this.state.modalActualizar}>
          <ModalHeader>
            <div><h3>Editar Registro</h3></div>
          </ModalHeader>

          <ModalBody>
            <FormGroup>
              <label>
                Id:

                  </label>

              <input
                className="form-control"
                readOnly
                type="text"
                value={this.state.form._id}
              />
            </FormGroup>

           
            <FormGroup>
              <label>
                Maxsize:
                  </label>
              <input
                className="form-control"
                name="maxsize"
                type="text"
                onChange={this.handleChange}
                value={this.state.form.maxsize}
              />
            </FormGroup>
          </ModalBody>

          <ModalFooter>
            <Button
              color="primary"
              onClick={() => this.editar(this.state.form)}
            >
              Editar
                </Button>
            <Button
              color="danger"
              onClick={() => this.cerrarModalActualizar()}
            >
              Cancelar
                </Button>
          </ModalFooter>
        </Modal>



        <Modal isOpen={this.state.modalInsertar}>
          <ModalHeader>
            <div><h3>Insertar Usuario</h3></div>
          </ModalHeader>

          <ModalBody>
            
              <Form>
            <FormGroup>
              <label>
                Username:
                  </label>
              <input
                className="form-control"
                name="username"
                type="text"
                onChange={this.handleChange}
              />
            </FormGroup>

            <FormGroup>
              <label>
                Email:
                  </label>
              <input
                className="form-control"
                name="email"
                type="text"
                onChange={this.handleChange}
              />

            </FormGroup>

            <FormGroup>
              <label>
                Name:
                  </label>
              <input
                className="form-control"
                name="name"
                type="text"
                onChange={this.handleChange}
              />
            </FormGroup>

            <FormGroup>
              <Form.Label>Type user</Form.Label>
                
              <Form.Control
                as="select"
                name="type_user"
                onChange={this.handleChange}
                placeholder="Select type"
                
              >
                <option>Select type...</option>
                <option>CLIENT</option>
                <option >ADMIN</option>
                
              </Form.Control>
            </FormGroup>

            <FormGroup>
              <label>
                Maxsize:
                  </label>
              <input
                className="form-control"
                name="maxsize"
                type="text"
                onChange={this.handleChange}
              />
            </FormGroup>
            </Form>
          </ModalBody>

          <ModalFooter>
            <Button
              color="primary"
              onClick={() => this.insertar()}
            >
              Insertar
                </Button>
            <Button
              className="btn btn-danger"
              onClick={() => this.cerrarModalInsertar()}
            >
              Cancelar
                </Button>
          </ModalFooter>
        </Modal>
      </>
    );
  }
}
const unidadAlmacenamiento = [
  'B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB'
];
export class RegistroFila extends React.Component {
  showSize = (size) => {
    let contador = 0;
    let formatNumber = size
    var length = Math.log(formatNumber) * Math.LOG10E + 1 | 0;
    while (length >= 4) {
      formatNumber = formatNumber / 1024;
      length = Math.log(formatNumber) * Math.LOG10E + 1 | 0;
      contador++;

    }
    return formatNumber.toFixed(2) + " " + unidadAlmacenamiento[contador];
  }

  render() {
    const dato = this.props.dato;
    return (
      <tr key={dato._id}>
        <td>{dato._id}</td>
        <td>{dato.username}</td>
        <td>{dato.email}</td>
        <td>{dato.name}</td>
        <td>{dato.type_user}</td>
        <td>{this.showSize(dato.maxsize)}</td>
        <td>
          <Button
            color="primary"
            onClick={() => this.props.mostrarModalActualizar(dato)}
          >
            Editar
              </Button>{" "}
          <Button color="danger" onClick={() => this.props.eliminar(dato)}>Eliminar</Button>
        </td>
      </tr>
    );
  }
}

export default TablaUser;