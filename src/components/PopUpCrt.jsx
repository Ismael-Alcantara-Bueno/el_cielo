import React from 'react'
import "../CSS/popup.css";

const PopUpCrt =({isOpen, onClose, onYes, component}) => {
  return (
    <div className={`modal popup ${isOpen ? "open" : ""} tabindex="-1"`}>
        <div className='modal-dialog modal-dialog-scrollable text-dark'>
            <div className='modal-content'>
            <div className='modal-header'>
                <h5 className='modal-title text-dark'>Agregar Caractersiticas</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close" onClick={onClose}>
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div className='modal-body'>
                {/* <div className='modal-dialog modal-dialog-scrollable text-dark'>
                    
                    
                </div> */}
                {component}
            </div>
            <div className='modal-footer'>
                <button type="button" class="btn btn-secondary" data-dismiss="modal" onClick={onClose}>Cancelar</button>
                <button type="button" class="btn btn-success" onClick={onYes}>Guardar Cambios</button>
            </div>
            </div>
        </div> 
    </div>
  )
}

export default PopUpCrt