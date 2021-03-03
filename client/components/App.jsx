import React from 'react';
import ReactDom from 'react-dom'
import QuestionList from './QuestionList.jsx'
import axios from 'axios'


export default class App extends React.Component {
  constructor() {
    super();

    this.state = {
      data: [],
      loadmore: false,
      clicked: false,

    };
    this.loadMore = this.loadMore.bind(this)
    this.fetchData= this.fetchData.bind(this)
  }

  

  fetchData() {
    axios.get("http://localhost:3002/questions").then(res => {
      this.setState({
        data: res.data.results.sort((a, b) => (a.question_helpfulness < b.question_helpfulness) ? 1 : -1 )
      })
     
    })
  }
  loadMore() {
    this.setState({
      loadmore: true,
      clicked: true
    })
  }

  componentDidMount() {
  this.fetchData()

  }
  
  
  render() {
    
    let Questions = this.state.loadmore === false ?  (<QuestionList render= {this.fetchData} clicked={this.state.clicked} loadMore={this.loadMore} questions = {this.state.data.slice(0, 4)} />) :  (<QuestionList  loadMore={this.loadMore} questions = {this.state.data} />);
    
    
    
    return (
      <div className="list">
        <h1>Questions & Answers</h1>
       {Questions}
      </div>
    );
  }
}

ReactDom.render(<App />, document.getElementById('name-of-the-service'))