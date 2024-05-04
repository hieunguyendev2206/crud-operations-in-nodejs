import React, {useEffect, useState} from 'react'
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import axios from "axios";
import "./subject.css";
import {Link} from 'react-router-dom'

const Subject = () => {

    const [subjects, setSubjects] = useState([]);

    useEffect(() => {

        const fetchData = async () => {
            const response = await axios.get("http://localhost:8000/api/getall");
            setSubjects(response.data);
        }

        fetchData();

    }, [])

    const MySwal = withReactContent(Swal);

    const deleteSubject = async (subjectId) => {
        MySwal.fire({
            title: 'Bạn có chắc muốn xóa không?',
            text: "Bạn sẽ không thể hoàn tác hành động này!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Có, xóa nó!'
        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(`http://localhost:8000/api/delete/${subjectId}`)
                    .then((response) => {
                        setSubjects(prevSubjects => prevSubjects.filter(subject => subject._id !== subjectId));
                        Swal.fire(
                            'Đã Xóa!',
                            'Môn học đã được xóa.',
                            'success'
                        )
                    })
                    .catch((error) => {
                        console.log(error);
                        Swal.fire(
                            'Lỗi!',
                            'Không thể xóa môn học này.',
                            'error'
                        )
                    });
            }
        });
    }

    return (
        <div className='subjectTable'>
            <h1 style={{paddingBottom: "20px"}}>Quản Lý Thông Tin Môn Học</h1>
            <Link to={"/add"} className='addButton'>Thêm môn học mới</Link>
            <table border={2} cellPadding={10} cellSpacing={0}>
                <thead>
                <tr>
                    <th>Mã Môn Học</th>
                    <th>Tên Môn Học</th>
                    <th>Số tín chỉ</th>
                    <th>Thao Tác</th>
                </tr>
                </thead>
                <tbody>
                {
                    subjects.map((subject, index) => {
                        return (
                            <tr key={subject._id}>
                                <td>{index + 1}</td>
                                <td>{subject.subjectname}</td>
                                <td>{subject.sotc}</td>
                                <td className='actionButtons'>
                                    <button onClick={() => deleteSubject(subject._id)}><i
                                        className="fa-solid fa-trash"></i></button>
                                    <Link to={`/edit/` + subject._id}><i
                                        className="fa-solid fa-pen-to-square"></i></Link>
                                </td>
                            </tr>
                        )
                    })
                }

                </tbody>
            </table>
        </div>
    )
}

export default Subject