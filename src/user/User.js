import React, {Component} from 'react';

class User extends Component {

    constructor(props) {
        super(props);

        //Must have to have this in call back
        this.btnClick = this.btnClick.bind(this);
    //    this.getAllUsers = this.getAllUsers.bind(this);
    }

    something = "abc";
    items = [];
    btnClick(){
        console.log("Clicked!:" + this.something);
        this.something = "123";
        console.log(this.something);
        this.forceUpdate();
    }

    //componentDidMount() {
    //executed when component rendered at the beggining
    componentDidMount(){
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
        let tablestyle = {'border':'1px solid black'};
        return (
            <div>
            <h1>Hello React; {this.something}</h1>
                <button onClick={this.btnClick}>ClickMe</button>
                <h2>Users</h2>
                <table style={tablestyle}>
                    <th>Name</th><th>Email</th><th>Address</th><th>Code</th><th>Status</th><th></th>
                    {this.items.map(item => (
                        <tr>
                            <td style={tablestyle}>{item.name}</td>
                            <td style={tablestyle}>{item.email}</td>
                            <td style={tablestyle}>{item.address}</td>
                            <td style={tablestyle}>{item.code}</td>
                            <td style={tablestyle}>{item.status}</td>
                            <td style={tablestyle}><img alt='Delete' height='24px' width='24px'
                                src='https://cdn.iconscout.com/icon/premium/png-512-thumb/delete-1432400-1211078.png'/>
                            </td>
                        </tr>
                    ))}
                </table>
            </div>
        )
    }
}

export default User;