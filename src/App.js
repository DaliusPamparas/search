import React, { Component } from 'react';
import './App.css';
import { Container, Row, Col, Card, CardImg, CardBody } from 'reactstrap'
import $ from 'jquery'


  

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {}
    
    this.handleChange = this.handleChange.bind(this);
    this.keyPress = this.keyPress.bind(this);
      
   

  this.searchApi("cat")

  }

  handleChange(e) {
    this.setState({ value: e.target.value })
 }

 keyPress(e){
    if(e.keyCode === 13){
       console.log('value', e.target.value);
       /* searchList(e.target.value) */
       this.searchApi(e.target.value)
       
    }
 }

  
  searchApi(searchTerm){
    
    const urlString = "https://api.giphy.com/v1/gifs/search?api_key=rtn7JKwdJjrKvfSXyp3KO9hYkw71pgCw&limit=25&offset=0&rating=G&lang=en&q=" + searchTerm
    console.log(urlString)

      $.ajax({
      url: urlString,
      success: (searchResults) => {
        console.log("fetched data sucsesfully")
        
        const results = searchResults.data
        var imageRows = []
        results.forEach((image) => {
       
         
         
          var imageC = <Col xs="4" key={image.id}>
          
          <Card className="card">
            <CardImg top width="100%" crossOrigin="anonymous" src={image.url} alt="cors" />
              <CardBody>
                {image.slug}
              
              </CardBody>
          </Card>   
        </Col>
        
          imageRows.push(imageC)
          
        })
        this.setState({rows: imageRows})
        
      },
      error: (xhr, status, err) => {
        console.error("we have problem :( to fech data")
      }
    }) 
  }
  
  render() {
    return (
      <div className="App">
       
       <Container>
       <Row>
          <Col xs="3">search<br/>
          <input value={this.state.value} onKeyDown={this.keyPress} onChange={this.handleChange} />
              
              <br/>
              Recent searches<br/>
          
          

          </Col>
          <Col xs="9">results <br/>
           
            <Row>
              
            {this.state.rows}
           
            </Row>
                                                                                                                                                                                                                                                                                                                       
          </Col>
        
        </Row>
      </Container>
      Powered By GIPHY
      </div>
    );
  }
}

export default App;
