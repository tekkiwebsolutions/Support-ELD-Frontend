import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import SpinnerButton from '../Froms/SpinnerButton';

function DeleteConfirmationDialog({ open,title, onClose, onDelete ,isloading}) {
  return (
    <Dialog open={open} onClose={onClose}>
      <div className='flex justify-center items-center my-3' >
        <ErrorOutlineIcon style={{ color: '#ebae34', fontSize: '80px' }} />
      </div>
      <DialogTitle className='flex justify-center items-center' >Are you sure ?</DialogTitle>
      <DialogContent>
         Are you sure you want to {title ?title :"Delete"} this item?
      </DialogContent>
      <DialogActions style={{ justifyContent: 'center' }}>
       <SpinnerButton onClick={onClose} btntext="Cancel" className="bg-[#8f8b83]"/>
       <SpinnerButton onClick={onDelete} btntext="Confirm" className="bg-[#23d632fb]" loading={isloading}/>
      </DialogActions>
    </Dialog>
  );
}

export default DeleteConfirmationDialog;
