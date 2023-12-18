import { Route, Routes } from 'react-router-dom';
import About from './pages/About.jsx';
import Capabilities from './pages/Capabilities.jsx';
import Home from './pages/Home.jsx';
import Projects from './pages/Projects.jsx';

import NavBar from './components/Nav/NavBar.jsx';

const AppRoutes = () => {
    return (
        <>
        <NavBar/>

        <Routes>
            <Route path='/' element={<Home/>} />
            <Route path='/about' element={<About/>}/>
            <Route path="/projects" element={<Projects/>} />
            <Route path="/capabilities" element={<Capabilities/>} />

        </Routes>

        </>
    )
}

export default AppRoutes
