import React, { useRef } from 'react'
import { FiCheckSquare } from 'react-icons/fi'

import { Form } from './styles'
import Modal from '../Modal'
import Input from '../Input'

interface Foods {
  id: number;
  name: string;
  description: string;
  price: string;
  available: boolean;
  image: string;
}

interface ModalProps {
  isOpen: boolean;
  setIsOpen: () => void;
  handleUpdateFood: (data: Foods) => void
  editingFood: Foods;
}

const ModalEditFood = (props: ModalProps) => {
  const formRef = useRef(null)
  const handleSubmit = async (data: Foods) => {
    console.log(data)
    props.handleUpdateFood(data)
    props.setIsOpen()
  }

  return (
    <Modal isOpen={props.isOpen} setIsOpen={props.setIsOpen}>
      <Form ref={formRef} onSubmit={handleSubmit} initialData={props.editingFood}>
        <h1>Editar Prato</h1>
        <Input name="image" icon={FiCheckSquare} placeholder="Cole o link aqui" />
        <Input name="name" icon={FiCheckSquare} placeholder="Ex: Moda Italiana" />
        <Input name="price" icon={FiCheckSquare} placeholder="Ex: 19.90" />
        <Input name="description" icon={FiCheckSquare} placeholder="Descrição" />
        <button type="submit" data-testid="edit-food-button">
          <div className="text">Editar Prato</div>
          <div className="icon">
            <FiCheckSquare size={24} />
          </div>
        </button>
      </Form>
    </Modal>
  )
}
export default ModalEditFood
