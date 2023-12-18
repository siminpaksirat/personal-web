import { useEffect, useState } from 'react';
import ProjectsScene from "../scenes/ProjectsScene";

import '../scenes/Projects.css';
import { all } from "../scenes/seed/All";
import { architectureSeedData, artSeedData, webDevSeedData } from "../scenes/seed/links";

import Modal from '../components/Modal';


const Projects = () => {

const[currentCategory, setCurrentCategory] = useState([])
const[isModalOpen, setIsModalOpen ]= useState(false)

const[currentProject,setCurrentProject] = useState(false)



useEffect(() => {
  setCurrentCategory(all);
  }, []);



    const modal = (data) => {
        return data.map(project => (
            <div className="modal" key={project.id} id="mod" onClick={()=> {setIsModalOpen(true), setCurrentProject(project)}}>
                <div className="hidden" key={project.id}>{project.tag}{project.imgs}</div>
                <div className="pic">
                    <img src={project.src} alt={project.name}/>
                </div>
                <div className="text">
                    <h3>:::: {project.name} ::::</h3>
                    <h4>:: {project.date} ::</h4>
                </div>
            </div>

        ));
    }




    const handleClick = (tag) => {
        if (tag === 'arch') {
          setCurrentCategory(architectureSeedData);
        } else if (tag === 'art') {
          setCurrentCategory(artSeedData);
        } else if (tag === 'web') {
          setCurrentCategory(webDevSeedData);
        } else if (tag === 'all') {
          setCurrentCategory(all);
        }
      };


      const indexGrabber = (arr)=> {
        return arr.map((img, index) => (
          <img className='img' key={index} src={img} alt={`Image ${index}`} />
        ));
      }


    return (
        <>
            <div className="project-page-wrapper" id="project-page">

<div className="button-container">
<button className='category-button' name="all" onClick={() => handleClick('all')}>
          All
        </button>
        <button className='category-button' name="web" onClick={() => handleClick('web')}>
          Web-Dev
        </button>
            <button className='category-button' name="arch" onClick={() => handleClick('arch')}>
          Architecture
        </button>
        <button className='category-button' name="art" onClick={() => handleClick('art')}>
          Art
        </button>

</div>

        <div className="projects-container">{modal(currentCategory)}</div>

        <Modal open={isModalOpen} onClose={()=> setIsModalOpen(false)} >
          <div className='title'>::: {currentProject.name} ::: {currentProject.date} :::</div>
          <div className='description'>::: {currentProject.description} :::</div>
          <div className='git'>{currentProject.link ? <a href={currentProject.link}>::: Github Link :::</a> : null}</div>
          <div className='img-container'>
          {currentProject.imgs && indexGrabber(currentProject.imgs)}
            </div>
        </Modal>
      </div>
            <ProjectsScene/>
        </>
    )
}

export default Projects
