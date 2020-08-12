import React from "react";
import "./styles/App.css";
class App extends React.Component {
  state = { typing: "", username: "", userData: [] };
  handleChange = (event) => {
    this.setState({ typing: event.target.value });
  };
  handleSubmit = (event) => {
    event.preventDefault();
    this.setState({ username: this.state.typing }, () => {
      this.setState({ typing: "" });
      let username = this.state.username;
      const url = `https://api.github.com/users/${username}/repos`;
      fetch(url)
        .then((resp) => resp.json())
        .then((data) => {
          let allData = [];
          for (const repo of data) {
            let dataObj = {};
            dataObj.name = repo.name;
            dataObj.stargazers = repo.stargazers_count;
            dataObj.forks = repo.forks_count;
            dataObj.issues = repo.open_issues_count;
            allData.push(dataObj);
          }
          this.setState({ userData: allData });
        })
        .catch((err) => {
          this.setState({ userData: [] });
          console.warn("Oh dear...", err);
        });
    });
  };

  render() {
    return (
      <>
        <header>
          <h1>GitHub Clone</h1>
          <form onSubmit={this.handleSubmit}>
            <input
              placeholder="GitHub Username"
              required
              id="textInput"
              type="text"
              value={this.state.typing}
              onChange={this.handleChange}
            ></input>
            <input id="submit" type="submit" value="SUBMIT"></input>
          </form>

          {this.state.username && <h2>Username: {this.state.username}</h2>}
        </header>
        {this.state.userData.length > 0 && (
          <>
            <div className="data">
              <h2>Repositories ({this.state.userData.length})</h2>
              <div className="gridContainer">
                {this.state.userData.map((item, idx) => {
                  return (
                    <div className="gridItem" key={idx}>
                      <h2>
                        {idx + 1}: {item.name}
                      </h2>
                      <div className="icons">
                        <h4>
                          <span title="Stargazers">
                            <i className="fas fa-star fa-lg"></i>
                          </span>
                          {item.stargazers}
                        </h4>
                        <h4>
                          <span title="Forks">
                            <i className="fas fa-code-branch fa-lg"></i>
                          </span>
                          {item.forks}
                        </h4>
                        <h4>
                          <span title="Issues">
                            <i className="fas fa-exclamation-circle fa-lg"></i>
                          </span>
                          {item.issues}
                        </h4>
                      </div>
                      <a
                        target="_blank"
                        href={`https://github.com/${this.state.username}/${item.name}`}
                      >
                        <i class="fas fa-external-link-square-alt fa-3x"></i>
                      </a>
                    </div>
                  );
                })}
              </div>
            </div>
          </>
        )}

        {this.state.username.length > 0 && this.state.userData.length == 0 && (
          <div className="data">
            <h2 id="notFound">
              GitHub User "{this.state.username}" does not exist!
            </h2>
          </div>
        )}
      </>
    );
  }
}
export default App;
