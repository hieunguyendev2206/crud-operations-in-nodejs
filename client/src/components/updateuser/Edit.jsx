import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from "axios";
import "../addsubject/add.css";
import toast from 'react-hot-toast';

const Edit = () => {

    const subjects = {
        subjectname: "",
        sotc: ""
    }

    const {id} = useParams();
    const navigate = useNavigate();
    const [subject, setSubject] = useState(subjects);

    const inputChangeHandler = (e) =>{
        const {name, value} = e.target;
        setSubject({...subject, [name]:value});
    }

    useEffect(()=>{
        axios.get(`http://localhost:8000/api/getone/${id}`)
            .then((response)=>{
                setSubject(response.data)
            })
            .catch((error)=>{
                console.log(error);
            })
    },[id])

    const submitForm = async(e)=>{
        e.preventDefault();
        if (!subject.subjectname.trim() || !subject.sotc) {
            toast.error('Vui lòng nhập đầy đủ thông tin môn học!', { position: "top-right" });
            return;
        }
        try {
            const response = await axios.put(`http://localhost:8000/api/update/${id}`, subject);
            toast.success(response.data.msg, { position: "top-right" });
            navigate("/");
        } catch (error) {
            console.error('Lỗi khi cập nhật môn học:', error);
            toast.error('Lỗi khi cập nhật môn học!', { position: "top-right" });
        }
    }

    return (
        <div className='addSubject'>
            <Link className="backButton" to={"/"}>Quay Lại</Link>
            <h3>Cập nhật môn học</h3>
            <form className='addSubjectForm' onSubmit={submitForm}>
                <div className="inputGroup">
                    <label htmlFor="subjectname">Tên môn học</label>
                    <input type="text" value={subject.subjectname} onChange={inputChangeHandler} id="subjectname" name="subjectname" autoComplete='off' placeholder='Tên môn học' />
                </div>
                <div className="inputGroup">
                    <label htmlFor="sotc">Số tín chỉ</label>
                    <input min="1" type="number" value={subject.sotc} onChange={inputChangeHandler} id="sotc" name="sotc" autoComplete='off' placeholder='Số tín chỉ' />
                </div>
                <div className="inputGroup">
                    <button type="submit">Cập nhật</button>
                </div>
            </form>
        </div>
    )
}

export default Edit;
