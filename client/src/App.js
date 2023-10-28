import { useEffect, useState } from 'react';
import axios from 'axios'
// var initialStudents = [
//     {
//         id: '1',
//         name: "Dinh",
//         address: "hue"
//     },
//     {
//         id: '2',
//         name: "Nam",
//         address: "quang nam"
//     },
//     {
//         id: '3',
//         name: "Tan",
//         address: "da nang"
//     },
//     {
//         id: '4',
//         name: "Hung",
//         address: "hue"
//     },
//     {
//         id: '5',
//         name: "Tri",
//         address: "quang tri"
//     },
//     {
//         id: '6',
//         name: "Anh",
//         address: "hue"
//     },
//     {
//         id: '7',
//         name: "Binh",
//         address: "da nang"
//     }
// ]

const App = () => {

    const [listStudents, setListStudents] = useState([]);
    const [id, setId] = useState('')
    const [name, setName] = useState('')
    const [address, setAdress] = useState('')
    const [nameErr, setNameErr] = useState('')
    const [addressErr, setAddressErr] = useState('')
    const [isEditting, setIsEditting] = useState(false)

    useEffect(() => {
        async function fetchData() {
            const result = await axios.get(`http://localhost:3001/students`)
            setListStudents(result.data)
        }
        fetchData()
    }, [])
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!isEditting) {
            if (name && address) {
                try {
                    const formValue = {
                        name,
                        address
                    }
                    console.log(formValue);
                    await axios({
                        method: "POST",
                        url: "http://localhost:3001/students/add",
                        data: formValue,
                    });

                    const newListStudent = [...listStudents, formValue]
                    setListStudents(newListStudent)
                    setName('')
                    setAdress('')
                } catch (err) {
                    console.log('xảy ra lỗi', err);
                }
            } else {
                if (name == '') {
                    setNameErr('Chưa nhập tên')
                }
                if (address == '') {
                    setAddressErr('Chưa nhập địa chỉ')
                }
            }
        } else {
            try {
                const listStudentsEdit = [...listStudents]
                const idx = listStudentsEdit.findIndex((std) => std.id == id)
                const formValue = {
                    id,
                    name,
                    address
                }
                console.log(formValue);
                await axios({
                    method: "PUT",
                    url: "http://localhost:3001/students/edit",
                    data: formValue,
                });
                listStudentsEdit.splice(idx, 1, formValue)
                setListStudents(listStudentsEdit)
                setAdress('')
                setName('')
                setIsEditting(false)
            } catch (err) {
                console.log('lỗi edit');
            }
        }
    }

    const handleClickEdit = (student) => {
        setName(student.name)
        setAdress(student.address)
        setId(student.id)
        setIsEditting(true)

    }

    const handleDelete = async (student) => {
        const newListStudents = [...listStudents]
        const idx = newListStudents.findIndex(std => student === std)
        const confirm = window.confirm("Bạn muốn xóa sinh viên này ?")
        if (confirm === true) {
            try {
                await axios({
                    method: "DELETE",
                    url: `http://localhost:3001/students/delete/${student.id}`
                });
                newListStudents.splice(idx, 1)
                setListStudents(newListStudents)
            } catch (err) {
                console.log('lỗi khi xóa');
            }
        }
    }

    const handleOnBlur = (e) => {
        if (e.target.name == 'name') {
            if (!e.target.value) {
                setNameErr('Chưa nhập tên')
            }
        } else if (e.target.name == 'address') {
            if (!e.target.value) {
                setAddressErr("Chưa nhập địa chỉ")
            }
        }
    }

    const handleOnInput = (e) => {
        if (e.target.name == 'name') {
            if (e.target.value) {
                setNameErr('')

            }
        } else if (e.target.name == 'address') {
            if (e.target.value) {
                setAddressErr("")
            }
        }

    }
    return (
        <>
            <form onSubmit={(e) => handleSubmit(e)}>
                <div>
                    <label>Tên</label>
                    <input type="text" name="name" value={name}
                        onChange={(e) => setName(e.target.value)}
                        onBlur={(e) => handleOnBlur(e)}
                        onInput={(e) => handleOnInput(e)}
                    />
                    <span style={{ color: 'red' }}>{nameErr}</span>
                </div>
                <br />
                <div>
                    <label>Địa chỉ</label>
                    <input type="text" name="address" value={address}
                        onChange={(e) => setAdress(e.target.value)}
                        onBlur={(e) => handleOnBlur(e)}
                        onInput={(e) => handleOnInput(e)}
                    />
                    <span style={{ color: 'red' }}>{addressErr}</span>
                </div>
                <div>
                    <button >{isEditting ? 'Sửa' : 'Thêm'}</button>
                </div>
            </form>
            <ul>
                {listStudents.map((student, idx) =>
                    <li key={idx}>
                        <h2>Name: {student.name}</h2>
                        <p>Address: {student.address}</p>
                        <button onClick={() => handleClickEdit(student)}>Sửa</button>
                        <button onClick={() => handleDelete(student)}>Xóa</button>
                    </li>
                )}
            </ul>
        </>
    )
}

export default App;