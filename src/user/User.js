import React, {Component} from 'react';

class User extends Component {

    constructor(props) {
        super(props);

        //Must have to have this in call back
        this.btnClick = this.btnClick.bind(this);
        this.openUserForEditUser = this.openUserForEditUser.bind(this);
        this.updateUser = this.updateUser.bind(this);
        //    this.getAllUsers = this.getAllUsers.bind(this);
    }

    something = "abc";
    items = [];

    btnClick() {
        console.log("Clicked!:" + this.something);
        this.something = "123";
        console.log(this.something);
        this.forceUpdate();
    }

    updateUser(event) {
        let saveButtonId = event.target.id;
        //throw out prefix
        let userId = saveButtonId.replace('_save', '');
        console.log("USER_ID:" + userId);

        let nameInput = document.getElementById(userId + "_name");
        let emailInput = document.getElementById(userId + "_email");
        let addressInput = document.getElementById(userId + "_address");
        let codeInput = document.getElementById(userId + "_code");
        let statusInput = document.getElementById(userId + "_status");


        nameInput.contentEditable = false;
        emailInput.contentEditable = false;
        addressInput.contentEditable = false;
        codeInput.contentEditable = false;
        statusInput.contentEditable = false;


        document.getElementById(userId + "_tr").style = "background-color:white";
        document.getElementById(userId + "_edit").style.display = "block";
        document.getElementById(userId + "_save").style.display = "none";

        console.log(nameInput.innerText);

        const user = {
            name: nameInput.innerText,
            email: emailInput.innerText,
            address: addressInput.innerText,
            code: codeInput.innerText,
            status: statusInput.innerText
        };

        let jsonSend = JSON.stringify(user);

        console.log(jsonSend);

        const requestOptions = {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: jsonSend,
        };
        fetch('http://localhost:8080/rest/api/User.svc/user(' + userId + ')', requestOptions)
            .then(response => console.log("Response: " + response));
    }

    openUserForEditUser(event) {
        let editButtonId = event.target.id;
        //throw out prefix
        let userId = editButtonId.replace('_edit', '');
        console.log("USER_ID:" + userId);
        document.getElementById(userId + "_name").contentEditable = true;
        document.getElementById(userId + "_email").contentEditable = true;
        document.getElementById(userId + "_address").contentEditable = true;
        document.getElementById(userId + "_code").contentEditable = true;
        document.getElementById(userId + "_status").contentEditable = true;

        document.getElementById(userId + "_tr").style = "background-color:green";

        document.getElementById(userId + "_edit").style.display = "none";
        document.getElementById(userId + "_save").style.display = "block";
    }

    //componentDidMount() {
    //executed when component rendered at the beggining
    componentDidMount() {
        fetch("http://localhost:8080/rest/api/User.svc/users")
            .then(res => res.json())
            .then(
                (result) => {
                    console.log('This is your data', result);
                    this.items = result;
                    this.setState({
                        isLoaded: true,
                    });
                },
                // Note: it's important to handle errors here
                // instead of a catch() block so that we don't swallow
                // exceptions from actual bugs in components.
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
            )
        /*        fetch("http://localhost:8080/rest/api/User.svc/users")
                    .then((response) => response.json())
                    .then((data) => console.log('This is your data', data));*/
    }


    render() {
        let tablestyle = {'border': '1px solid black'};
        let nonDisplay = {'display': 'none'};
        return (
            <div>
                <h1>Hello React; {this.something}</h1>
                <button onClick={this.btnClick}>ClickMe</button>
                <h2>Users</h2>
                <table style={tablestyle}>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Address</th>
                    <th>Code</th>
                    <th>Status</th>
                    <th>&nbsp;</th>
                    <th>&nbsp;</th>
                    {this.items.map(item => (
                        <tr key={item.id} id={item.id + "_tr"}>


                            <td id={item.id + "_name"} style={tablestyle} contenteditable="false">{item.name}</td>
                            <td id={item.id + "_email"} style={tablestyle} contenteditable="false">{item.email}</td>
                            <td id={item.id + "_address"} style={tablestyle} contenteditable="false">{item.address}</td>
                            <td id={item.id + "_code"} style={tablestyle} contenteditable="false">{item.code}</td>
                            <td id={item.id + "_status"} style={tablestyle} contenteditable="false">{item.status}</td>
                            <td id={item.id + "_delete"} style={tablestyle} contenteditable="false">
                                <img alt='Delete' height='24px' width='24px'
                                     src='https://cdn.iconscout.com/icon/premium/png-512-thumb/delete-1432400-1211078.png'/>
                            </td>
                            <td style={tablestyle}>
                                <img onClick={this.openUserForEditUser}
                                     id={item.id + "_edit"} alt='Edit' height='24px' width='24px'
                                     src='https://img.favpng.com/16/12/0/computer-icons-editing-icon-design-download-png-favpng-T5EpYHhEpDKNTxP01jSTgd0Tc.jpg'/>


                                <img style={nonDisplay} onClick={this.updateUser}
                                     id={item.id + "_save"} alt='Save' height='24px' width='24px'
                                     src='https://aux.iconspalace.com/uploads/21021692871308901792.png'/>

                            </td>

                        </tr>
                    ))}
                </table>
            </div>
        )
    }
}

export default User;