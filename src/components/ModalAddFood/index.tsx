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
  handleAddFood: (data: Foods) => void
}

const ModalAddFood = ({ isOpen, setIsOpen, handleAddFood }: ModalProps) => {
  const formRef = useRef(null)
  const handleSubmit = async (data: Foods) => {
    handleAddFood(data)
    setIsOpen()
  }

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
      <Form ref={formRef} onSubmit={handleSubmit}>
        <h1>Novo Prato</h1>
        <Input name="image" icon={FiCheckSquare} placeholder="Cole o link aqui" />

        <Input name="name" icon={FiCheckSquare} placeholder="Ex: Moda Italiana" />
        <Input name="price" icon={FiCheckSquare} placeholder="Ex: 19.90" />

        <Input name="description" icon={FiCheckSquare} placeholder="Descrição" />
        <button type="submit" data-testid="add-food-button">
          <p className="text">Adicionar Prato</p>
          <div className="icon">
            <FiCheckSquare size={24} />
          </div>
        </button>
      </Form>
    </Modal>
  )
}

export default ModalAddFood
