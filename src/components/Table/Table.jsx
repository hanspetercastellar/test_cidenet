import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import "./Table.css";
import { useDispatch, useSelector } from "react-redux";
import {useEffect, useState} from "react";
import {actionsConst, openModal, rowEditing, setRowEditing} from "../../redux/reducers/product.reducer";
import {Button, Grid, TextField} from "@mui/material";
import {ModalEdit} from "../Modals/Edit.modal";
import Swal from "sweetalert2";

let timeOut = null;
const makeStyle=(status)=>{
  if(status === 'edit')
  {
    return {
      background: 'rgb(145 254 159 / 47%)',
      color: 'green',
      marginRight: 12
    }
  }
  else if(status === 'delete')
  {
    return{
      background: '#ffadad8f',
      color: 'red',
    }
  }
  else{
    return{
      background: '#59bfff',
      color: 'white',
    }
  }
}

export default function BasicTable() {
  const data = useSelector((state) => state.product.items)
  const dispatch  = useDispatch()
  const [openModal, setOpenModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const handleEdit = (row) => {
    dispatch(rowEditing(row))
    setIsEditing(true);
    setOpenModal(true)
  }

  const handleDelete = (row) => {
    Swal.fire({
      title: 'Do you want to delete this product?',
      showDenyButton: true,
      confirmButtonText: 'Yes',
      denyButtonText: `No`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        dispatch({type: actionsConst.DELETE_PRODUCT, id: row.id})
        dispatch({type: actionsConst.FETCH_ALL})
      } else if (result.isDenied) {
        Swal.fire('Changes are not saved', '', 'info')
      }
    })
  }

  const handleAddProducts = () => {
    setIsEditing(false);
    dispatch(rowEditing({}))
    setOpenModal(true)
  }

  const handleSearch = (e) => {
    const {value} = e.currentTarget
    if(timeOut) clearTimeout(timeOut)
    timeOut = setTimeout(() => {
        dispatch({type: actionsConst.SEARCH_PRODUCT, id: value})
    }, 1000)
  }

  useEffect(() => {
    dispatch({type: actionsConst.FETCH_ALL})
  },[])

  return (
      <div className="Table">
        <Grid
            container
            direction="row"
            justifyContent="center"
            alignItems="center"
        >
          <Grid item xs={10}>
            <h1>Products</h1>
          </Grid>
          <Grid item xs>
            <Button onClick={handleAddProducts}>
              Add product
            </Button>
          </Grid>
        </Grid>
        <TextField id="standard-basic" onChange={handleSearch} label="Search" variant="standard" />
        <TableContainer
          component={Paper}
          style={{ boxShadow: "0px 13px 20px 0px #80808029" }}
        >
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Serial</TableCell>
                <TableCell align="left">Connection Type</TableCell>
                <TableCell align="left">Location</TableCell>
                <TableCell align="left">storage system</TableCell>
                <TableCell align="left">condition</TableCell>
                <TableCell align="left">owner</TableCell>
                <TableCell align="left">manufacturer</TableCell>
                <TableCell align="left">purchase</TableCell>
                <TableCell align="left">i_max</TableCell>
                <TableCell align="left">i_b</TableCell>
                <TableCell align="left">i_n</TableCell>
                <TableCell align="left">seals</TableCell>
                <TableCell align="left">id</TableCell>
                <TableCell align="left">created at</TableCell>
                <TableCell align="left">updated at</TableCell>
                <TableCell align="left"></TableCell>
              </TableRow>
            </TableHead>
            <TableBody style={{ color: "white" }}>
              {data && data.length && data.map((row) => (
                <TableRow
                  key={row.serial}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row.serial}
                  </TableCell>
                  <TableCell align="left">{row.connection_type}</TableCell>
                  <TableCell align="left">{row.location}</TableCell>
                  <TableCell align="left">{row.storage_system}</TableCell>
                  <TableCell align="left">{row.condition}</TableCell>
                  <TableCell align="left">{row.owner}</TableCell>
                  <TableCell align="left">{row.manufacturer}</TableCell>
                  <TableCell align="left">{row.purchase}</TableCell>
                  <TableCell align="left">{row.i_max}</TableCell>
                  <TableCell align="left">{row.i_b}</TableCell>
                  <TableCell align="left">{row.i_n}</TableCell>
                  <TableCell align="left">{row.seals}</TableCell>
                  <TableCell align="left">{row.id}</TableCell>
                  <TableCell align="left">{row.created_at}</TableCell>
                  <TableCell align="left">{row.updated_at}</TableCell>
                  <TableCell align="left">
                    <Button className="status" onClick={() => handleEdit(row)} style={makeStyle('edit')}>{'Edit'}</Button>
        
                    <Button className="status" onClick={() => handleDelete(row)} style={makeStyle('delete')}>{'Delete'}</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <ModalEdit open={openModal} handleClose={setOpenModal} isEditing={isEditing}/>
      </div>
  );
}
