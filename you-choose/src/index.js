import React, { useReducer } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root"));

function App() {
    sessionStorage.removeItem("username");
    return (
        <div>
            <div className="header">
                <h1 className="logo">YouChoose</h1>
                <div className="accountInfo">
                    <LoginBtn />
                    <LogoutBtn />
                    <CreateAcctBtn />
                    <CurrentUser />
                </div>
            </div>
            <div id="login-outer" className="hide">
                <LoginDisplay />
            </div>
            <div id="acct-outer" className="hide">
                <CreateAcctDisplay />
            </div>
            <div className="main" id="main">
                <div className="column">
                    <div>
                        Enter a list of items you need help choosing from, with
                        each item on a new line:
                    </div>
                    <ChoiceList />
                    <SaveListBtn />
                </div>
                <div className="column">
                    <Output />
                    <ChooseBtn />
                </div>
                <div className="column" id="your-lists">
                    <div>Your Lists:</div>
                    <DisplayLists />
                    <div className="listsBtns">
                        <NewListBtn />
                        <DeleteListBtn />
                        {/* <LoadListBtn /> */}
                    </div>
                </div>
                <div id="namelist-outer" className="column hide">
                    <NameListDisplay />
                </div>
            </div>
        </div>
    );
}

class NameListDisplay extends React.Component {
    handleClick() {
        let listField = document.getElementById("listname-field");
        let userID = sessionStorage.getItem("username");
        // addList(listName);
        fetch("http://localhost:3001/api/add-list", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                listname: listField.value,
                username: userID,
            }),
        })
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                if (!data.success) {
                    alert("You already have a list of this name");
                }
                loadLists();
            })
            .catch((error) => {
                console.log(error);
            });

        let nameDisplay = document.getElementById("namelist-outer");
        let yourLists = document.getElementById("your-lists");
        nameDisplay.classList.add("hide");
        yourLists.classList.remove("hide");
        listField.value = "";
    }
    render() {
        return (
            <div id="namelist-inner">
                <p>Name your list:</p>
                <textarea rows="1" cols="20" id="listname-field"></textarea>
                <p>
                    <button type="button" onClick={this.handleClick}>
                        Confirm
                    </button>
                </p>
            </div>
        );
    }
}

class LoginDisplay extends React.Component {
    handleClick() {
        let userField = document.getElementById("username-field");
        let userID = userField.value;

        fetch("http://localhost:3001/api/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username: userID }),
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.success) {
                    setUserState(userID);
                } else {
                    setUserState(null);
                    alert("Login failed: username does not exist");
                }
                //console.log(data.success);
            })
            .catch((error) => {
                console.log(error);
            });
        userField.value = "";
    }
    render() {
        return (
            <div id="login-inner">
                <p>Enter usernname:</p>
                <textarea rows="1" cols="20" id="username-field"></textarea>
                <p>
                    <button type="button" onClick={this.handleClick}>
                        Log In
                    </button>
                </p>
            </div>
        );
    }
}

class CreateAcctDisplay extends React.Component {
    handleClick() {
        let acctField = document.getElementById("acct-field");
        let userID = acctField.value;

        fetch("http://localhost:3001/api/create-account", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username: userID}),
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.success) {
                    setUserState(userID);
                } else {
                    setUserState(null);
                    alert("Sorry, that username is already taken");
                }
            })
            .catch((error) => {
                console.log(error);
            });
        acctField.value = "";
    }
    render() {
        return (
            <div id="acct-inner">
                <p>Enter a unique usernname:</p>
                <textarea rows="1" cols="20" id="acct-field"></textarea>
                <p>
                    <button type="button" onClick={this.handleClick}>
                        Create Account
                    </button>
                </p>
            </div>
        );
    }
}

class LoginBtn extends React.Component {
    handleClick() {
        let loginContainer = document.getElementById("login-outer");
        let main = document.getElementById("main");
        loginContainer.classList.remove("hide");
        main.classList.add("hide");
    }
    render() {
        return (
            <div className="acctOptions">
                <button type="button" onClick={this.handleClick}>
                    Log in
                </button>
            </div>
        );
    }
}

function setUserState(userID) {
    let iDdisplay = document.getElementById("User");
    let loggedIn = userID !== null;
    let logOutBtn = document.getElementById("logoutBtn");
    let main = document.getElementById("main");
    let loginDisplay = document.getElementById("login-outer");
    let acctDisplay = document.getElementById("acct-outer");
    loginDisplay.classList.add("hide");
    acctDisplay.classList.add("hide");
    if (loggedIn) {
        iDdisplay.innerHTML = userID;
        sessionStorage.setItem("username", userID);
        logOutBtn.disabled = false;
    } else {
        iDdisplay.innerHTML = "Not logged in";
        sessionStorage.removeItem("username");
    }
    main.classList.remove("hide");
    loadLists();
}

function loadLists() {
    clearLists();
    clearChoices();
    let user = sessionStorage.getItem("username");
    if (user == null) return;
    fetch("http://localhost:3001/api/lists", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: user }),
    })
        .then((res) => res.json())
        .then((data) => {
            data.forEach((row) => {
                addList(row.l_name, row.list_id);
            });
        })
        .catch((error) => {
            console.log(error);
        });
}

function addList(listName, listID) {
    let choiceLists = document.getElementById("lists");
    if (listName !== null) {
        let option = document.createElement("option");
        option.text = listName;
        option.value = listName;
        option.id = listID;
        choiceLists.appendChild(option);
    }
}

function clearLists() {
    let choiceLists = document.getElementById("lists");
    while (choiceLists.options.length > 0) {
        choiceLists.remove(0);
    }
}

// Todo if extra time
// function selectList(listname) {
//     let choiceLists = document.getElementById("lists");
//     choiceLists.value = listname;
// }

class LogoutBtn extends React.Component {
    handleClick() {
        setUserState(null);
    }
    render() {
        return (
            <div className="acctOptions">
                <button type="button" onClick={this.handleClick} id="logoutBtn">
                    Log out
                </button>
            </div>
        );
    }
}

class CreateAcctBtn extends React.Component {
    handleClick() {
        let acctContainer = document.getElementById("acct-outer");
        let main = document.getElementById("main");
        acctContainer.classList.remove("hide");
        main.classList.add("hide");
    }
    render() {
        return (
            <div className="acctOptions">
                <button type="button" onClick={this.handleClick}>
                    Create Account
                </button>
            </div>
        );
    }
}

function CurrentUser() {
    return (
        <div id="User" className="acctOptions">
            Not logged in
        </div>
    );
}

function ChoiceList() {
    return (
        <div>
            <textarea rows="10" cols="20" id="choices"></textarea>
        </div>
    );
}

function loadChoices(listID) {
    var choiceArea = document.getElementById("choices");
    var choiceText = "";
    fetch("http://localhost:3001/api/choices", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ list_id: listID }),
    })
        .then((res) => res.json())
        .then((data) => {
            data.forEach((row) => {
                choiceText += row.c_name + "\r\n";
            });
            choiceArea.value = choiceText.substring(0, choiceText.length - 2);
        })
        .catch((error) => {
            console.log(error);
        });
}

function clearChoices() {
    var choiceArea = document.getElementById("choices");
    choiceArea.value = "";
    var theChosen = document.getElementById("choiceOut");
    theChosen.value = "";
}

class SaveListBtn extends React.Component {
    handleClick() {
        let listSelect = document.getElementById("lists");
        let index = listSelect.selectedIndex;
        let element = listSelect.childNodes[index];
        let listID = element.getAttribute("id");
        console.log(listID);

        var textInput = document.getElementById("choices").value;
        var lines = textInput.split("\n");
        console.log(lines);

        fetch("http://localhost:3001/api/save-choices", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ list_id: listID, choices: lines }),
        })
            .then((res) => res.json())
            .then((data) => {})
            .catch((error) => {
                console.log(error);
            });
    }
    render() {
        return (
            <div>
                <button type="button" onClick={this.handleClick}>
                    Save List
                </button>
            </div>
        );
    }
}

// FOR TESTING
// class LoadListBtn extends React.Component {
//     handleClick() {
//         setUserState("john");
//     }
//     render() {
//         return (
//             <div>
//                 <button type="button" onClick={this.handleClick}>
//                     TEST
//                 </button>
//             </div>
//         );
//     }
// }

class ChooseBtn extends React.Component {
    handleClick() {
        var textInput = document.getElementById("choices").value;
        var choiceOutput = document.getElementById("choiceOut");
        var lines = textInput.split("\n");
        var randomNum = Math.floor(Math.random() * lines.length);
        choiceOutput.value = lines[randomNum];
    }
    render() {
        return (
            <div>
                <button type="button" onClick={this.handleClick}>
                    Choose for me!
                </button>
            </div>
        );
    }
}

function Output() {
    return (
        <div>
            <textarea rows="1" cols="20" id="choiceOut" readOnly></textarea>
        </div>
    );
}

class DisplayLists extends React.Component {
    handleChange = (event) => {
        let index = event.target.selectedIndex;
        let element = event.target.childNodes[index];
        let listID = element.getAttribute("id");
        loadChoices(listID);
    };
    render() {
        return (
            <div>
                <select
                    name="Lists"
                    id="lists"
                    onChange={this.handleChange}
                    size={5}
                ></select>
            </div>
        );
    }
}

class NewListBtn extends React.Component {
    handleClick() {
        let nameDisplay = document.getElementById("namelist-outer");
        let yourLists = document.getElementById("your-lists");
        nameDisplay.classList.remove("hide");
        yourLists.classList.add("hide");
    }
    render() {
        return (
            <div>
                <button type="button" onClick={this.handleClick}>
                    New List
                </button>
            </div>
        );
    }
}

class DeleteListBtn extends React.Component {
    handleClick() {
        let listSelect = document.getElementById("lists");
        let index = listSelect.selectedIndex;
        let element = listSelect.childNodes[index];
        let listID = element.getAttribute("id");
        console.log(listID);

        fetch("http://localhost:3001/api/delete-list", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ list_id: listID }),
        })
            .then((res) => res.json())
            .then((data) => {
                console.log("made it");
                loadLists();
            })
            .catch((error) => {
                console.log(error);
            });
    }
    render() {
        return (
            <div>
                <button type="button" onClick={this.handleClick}>
                    Delete
                </button>
            </div>
        );
    }
}

root.render(<App />);
