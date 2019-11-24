import axios from 'axios'

const fetchEmployees = async (pageNum) => {
    const fetch = await axios.get(`/api/employees/${pageNum}`)
   .then(res=>
    res.data.rows)

    return fetch
}

export default fetchEmployees