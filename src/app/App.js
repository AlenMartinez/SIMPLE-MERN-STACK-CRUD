import React, {Component} from 'react';

class App extends Component{

    constructor(){
        super();
        this.state = {
                title: '',
                description: '',
                task: [],
                _id:  '',
                edit: "Guardar"
            };

        this.addTask = this.addTask.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    addTask(e) {
        if(this.state._id){
            fetch('/api/tasks/' + this.state._id, {
                method: 'PUT',
                body: JSON.stringify(this.state),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
            .then(res => res.json())
            .then(data => {
                M.toast({html: 'Tarea editada con exito'});
                this.setState({
                    title: '',
                    description: '' ,
                    edit: 'Guardar'
                });  
                this.fetchTask();
            })
        }else{
            fetch('/api/tasks', {
                method: 'POST',
                body: JSON.stringify(this.state),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                M.toast({html: 'Tarea guardada con exito'});
                this.setState({
                    title: '',
                    description: '' 
                });
                this.fetchTask();
            })
            .catch(err => console.log(err, 'error'))
        }

        e.preventDefault();
    }

    
    deleteTasks(id){
        if(confirm('Estas seguro de eliminarlo')){
            fetch('/api/tasks/' + id,{
                method: 'DELETE',
                body: JSON.stringify(this.state),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            }).then(res => res.json())
            .then(data =>{
                this.fetchTask();
                M.toast({html: 'Tarea Eliminada con exito'});
                console.log(data)
            })
        }
    }

    editTasks(id){
        fetch('/api/tasks/' + id)
        .then(res => res.json())
        .then(data => {
            this.setState({
                title: data.title,
                description: data.description,
                _id: data._id,
                edit: 'Editar'
            })
        })
          this.fetchTask();

    }

    fetchTask(){
        fetch('/api/tasks')
            .then(res => res.json())
            .then(data => this.setState({ task: data}))

    }

    componentDidMount(){
        this.fetchTask()
    }

    handleChange(e){
      const { name, value } = e.target
      this.setState({
          [name]: value
      })
    }

    render(){
        return(
            <div>
               <nav className="light-red darken-4">
                    <div className="container">
                        <a className="brand-logo" href="/">CRUD</a>
                    </div>
               </nav>

               <div className="container">
                    <div className="row">
                        <div className="col s5">
                            <div className="card">
                                <div className="card-content">
                                    <form onSubmit={this.addTask}>
                                        <div className="row">
                                            <div className="input-field col s12">
                                                <input name="title" type="text" onChange={this.handleChange} placeholder="titulo" value={this.state.title}/>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="input-field col s12">
                                                <textarea placeholder="description" name="description" onChange={this.handleChange} className="materialize-textarea" value={this.state.description}></textarea>
                                            </div>
                                        </div>
                                        <button type="submit" className="btn light-blue darken-4">{this.state.edit}</button>
                                     </form>
                                </div>
                            </div>
                        </div>
                        <div className="col s7">
                                <table>
                                    <thead>
                                        <tr>
                                            <th>Title</th>
                                            <th>description</th>
                                            <th>options</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            this.state.task.map(tasks => {
                                                return (
                                                    <tr key={tasks._id}>
                                                        <td>{tasks.title}</td>
                                                        <td>{tasks.description}</td>
                                                        <td>
                                                            <button onClick={() => this.editTasks(tasks._id)}  className="btn light-red darken-4"><i className="material-icons">mode_edit</i></button>
                                                            <button onClick={() => this.deleteTasks(tasks._id)} className="btn light-red darken-4"><i className="material-icons">delete</i></button>
                                                        </td>
                                                    </tr>
                                                )
                                            })
                                        }
                                    </tbody>
                                </table>
                        </div>
                    </div>
               </div>
            </div>
        );
    }
}

export default App;