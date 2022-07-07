import React, {useState, useEffect, useRef, createContext, } from "react";
import './index.css';
import {Route, BrowserRouter as Router, Routes} from 'react-router-dom'
import App from "./App";
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'
import Register from './components/Register/Register'
import SignIn from './components/Login/login'
import SignUp from './components/Logout/logout'
import Blog from './components/BlogIT/blogit'
import BlogDetail from "./components/BlogIT/blogdetail";
import Loading from "./Loading/Loading"
import Category from "./components/BlogIT/category";
import PostDetail from "./components/Post/postdetail";
import Fabbi from "./components/Fabbi/Fabbi";
import axiosInstance from './axios'
import FabbiDetail from './components/Fabbi/FabbiDetail'
import Contact from "./Contacts/Contacs";
import Admin from './Admin'
import Create from './components/adminblog/create'
import Edit from './components/adminblog/edit'
import UserInfo from './components/Userinfo/User'
import UserEdit from './components/UserEdit/UserEdit'
import Store from './components/Context/Context'

const Application = () => {
    const [loading, setLoading] = useState(true)
    const [login, setLogin] = useState(false)
    const [userName, setUser] = useState("")
    const [userEmail, setUserEmail] = useState("")

    const [blogs, setBlogs] = useState([]);
    const scrollRef = useRef();


    const [infor, setInfor] = useState([]);
    useEffect(() => {
        axiosInstance.get('user-blog/info/').then((res) => {
            const allPosts = res.data.data;
            console.log(allPosts)
            setInfor(allPosts);
        });
    }, []);

    useEffect(() => {
        const token = localStorage.getItem('access_token')
        axiosInstance.get('blog/').then((res) => {
            const allPosts = res.data;
            setBlogs(allPosts)
        })
        if (token === null) {
            setLogin(false)
        } else {
            setLogin(true)
        }

    }, [])

    useEffect(() => {
        const fetch = async () => {
            // const res = await axios.get("http://127.0.0.1:8000/api/blog/")
            setLoading(false)
        }
        setTimeout(() => {
            fetch()
        }, 1500)

    }, []);

    const handleLogin = (userName) => {
        setLogin(true)
        setUser(userName)
    }
    const handleLogin_email = (userName) => {
        setLogin(true)
        setUserEmail(userName)
    }
    const handleLogout = () => {
        setLogin(false)
    }

    // useEffect(() => {
    //     const fixedHeader = () => {
    //         if (
    //             document.documentElement.scrollTop > 120
    //         ) {
    //             scrollRef.current.classList.add('show');
    //         } else {
    //             scrollRef.current.classList.remove('show');
    //         }
    //     };
    //     window.addEventListener('scroll', fixedHeader);
    //     return () => {
    //         window.removeEventListener('scroll', fixedHeader);
    //     };
    // }, []);

    return (

        <Router>

            <Store>
                <div className="scroll-container" style={{marginTop: '64px'}}>
                    <div ref={scrollRef} className="scroll-top" onClick={() => window.scrollTo(0, 0)}/>
                    {loading ? <Loading/> : <div>

                        <Header login={login} isLogin={handleLogout}  user={userName} email={userEmail}/>

                        <Routes>
                            <Route path='/' element={<App loading={login} dataBlog={blogs}/>}/>
                            <Route path='/register' element={<Register/>}/>
                            <Route path='/login' element={<SignIn login={handleLogin}/>}/>
                            <Route path='/logout' element={<SignUp/>}/>
                            <Route path='/blog' element={<Blog/>}/>
                            <Route path='/category/:id' element={<Category/>}/>
                            <Route path='/blog/:id' element={<BlogDetail/>}/>
                            <Route path='/user' element={<UserInfo/>}/>
                            <Route path='/user-edit' element={<UserEdit/>}/>
                            <Route path='/posts/:slug' element={<PostDetail/>}/>
                            <Route path='/fabbi' element={<Fabbi/>}/>
                            <Route path='/fabbi/:slug' element={<FabbiDetail/>}/>
                            <Route path='/admin' element={<Admin/>}/>
                            <Route path='/admin/create/' element={<Create/>}/>
                            <Route path='/admin/edit/:id' element={<Edit/>}/>
                            <Route path='/contacts/' element={<Contact/>}/>
                        </Routes>
                        <Footer/>
                    </div>}
                </div>
            </Store>
        </Router>

    );
}
export default Application;
