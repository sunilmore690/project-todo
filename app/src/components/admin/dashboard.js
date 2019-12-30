import React,{useState, useEffect} from "react";
import { connect } from "react-redux";
import ProjectList from "../ProjectList";
import ProjectModal from "../ProjectModal";
import axios_instance from '../../api'

function AdminDashboard(props) {
  let [project, setProject] = useState({});
  let [show, setShow] = useState(false);
  let [users,setUsers] = useState([])
  function handleSetProject(project) {
    setProject(project);
    setShow(true);
  }
  function handleClose(){
      setShow(false)
  }
  async function fetchUsers(){
      let res = await  axios_instance.get('/users')
      console.log('users',res.docs)
      setUsers(res.docs)
  }
  useEffect(()=>{
    fetchUsers()
  },[])
  return (
    <div>
      <ProjectModal project={project} show={show} handleClose={handleClose} users={users}/>
      <ProjectList openModal={handleSetProject} />
      {/* <Pagination/> */}
    </div>
  );
}
const mapStateToProps = (state, props) => {
  return {
    projects: state.projects
  };
};
export default connect(mapStateToProps)(AdminDashboard);
