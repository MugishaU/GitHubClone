import React from "react"

function repoCard(props) {
    props.userData.map((item, idx) => {
        return (
            <div key={idx}>
                <h2>
                    {idx + 1}: {item.name}
                </h2>
                <div className="icons">
                    <h4><span><i className="far fa-star fa-lg"></i></span> {item.stargazers}</h4>
                    <h4><span><i className="fas fa-exclamation-circle fa-lg"></i></span> {item.issues}</h4>
                    <h4><span><i className="fas fa-code-branch fa-lg"></i></span> {item.forks}</h4>
                </div>
                <a
                    target="_blank"
                    href={`https://github.com/${props.username}/${item.name}`}
                >
                    <button>
                        Go to Repo
                    </button>
                </a>
                <hr />
            </div>
        );
    })
}

export default repoCard


   
