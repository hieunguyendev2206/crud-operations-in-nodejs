import React, {useState} from 'react'
import {Link, useNavigate} from 'react-router-dom';
import axios from "axios";
import "./add.css";
import toast from 'react-hot-toast';

const Add = () => {
    const subjects = {
        subjectname: "",
        sotc: "",
    }

    const [subject, setSubject] = useState(subjects);
    const navigate = useNavigate();

    const inputHandler = (e) => {
        const {name, value} = e.target;
        setSubject({...subject, [name]: value});
    }

    const submitForm = async (e) => {
        e.preventDefault();
        // Kiểm tra xem người dùng đã nhập đủ thông tin chưa
        if (!subject.subjectname.trim() || !subject.sotc.trim()) {
            toast.error('Vui lòng nhập đầy đủ thông tin môn học!', {position: "top-right"});
            return;
        }

        // Thực hiện POST request để thêm môn học mới
        try {
            const response = await axios.post("http://localhost:8000/api/create", subject);
            toast.success(response.data.msg, {position: "top-right"});
            navigate("/");
        } catch (error) {
            console.error('Lỗi khi thêm môn học:', error);
            toast.error('Lỗi khi thêm môn học!', {position: "top-right"});
        }
    }

    return (
        <div className='addSubject'>
            <Link className="backButton" to={"/"}>Quay Lại</Link>
            <h3>Thêm môn học mới</h3>
            <form className='addSubjectForm' onSubmit={submitForm}>
                <div className="inputGroup">
                    <label htmlFor="subjectname">Tên môn học</label>
                    <input type="text" onChange={inputHandler} id="subjectname" name="subjectname" autoComplete='off'
                           placeholder='Nhập tên môn học'/>
                </div>
                <div className="inputGroup">
                    <label htmlFor="sotc">Số tín chỉ</label>
                    <input min="1" type="number" onChange={inputHandler} id="sotc" name="sotc" autoComplete='off'
                           placeholder='Số tín chỉ'/>
                </div>
                <div className="inputGroup">
                    <button type="submit">Thêm</button>
                </div>
            </form>
        </div>
    )
}

export default Add;
