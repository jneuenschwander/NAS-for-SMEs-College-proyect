import 'bootstrap/dist/css/bootstrap.min.css';
import * as Icon from 'react-bootstrap-icons';
export default function HeadTableFiles(props){
    const {titles} = props;
    const toUpperCase = (str) => {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }
    return(
        <>
            <thead >
                <tr>
                    <th> <Icon.Files size={20}/> </th>
                    {
                        titles.map((title, i) => <th key={i}>{toUpperCase(title)}</th>)
                    }
                </tr>
                
            </thead>
        </>
    );
}