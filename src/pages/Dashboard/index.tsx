import React, { useEffect, useState } from 'react'

import Header from '../../components/Header'
import api from '../../services/api'
import Food from '../../components/Food'
import ModalAddFood from '../../components/ModalAddFood'
import ModalEditFood from '../../components/ModalEditFood'
import { FoodsContainer } from './styles'

import { FoodData, FoodProps } from '../../types'

const Dashboard = () => {
  const [foods, setFoods] = useState<FoodProps[]>()
  const [modalOpen, setModalOpen] = useState(false)
  const [editModalOpen, setEditModalOpen] = useState(false)
  const [editingFood, setEditingFood] = useState<FoodProps>()

  useEffect(() => {
    async function loadFoods () {
      api.get('/foods').then(response => setFoods(response.data))
    }
    loadFoods()
  }, [])

  const toggleModal = () => {
    setModalOpen(!modalOpen)
  }

  const toggleEditModal = () => {
    setEditModalOpen(!editModalOpen)
  }

  const handleAddFood = async (food: FoodProps) => {
    try {
      const response = await api.post('/foods', {
        ...food,
        available: true
      })
      const addFood: FoodData['foods'] = [...foods, response.data]
      setFoods(addFood)
    } catch (err) {
      console.log(err)
    }
  }

  const handleUpdateFood = async (food: FoodProps) => {
    try {
      const foodUpdated = await api.put(
        `/foods/${editingFood.id}`,
        { ...editingFood, ...food }
      )

      const foodsUpdated = foods.map(f =>
        f.id !== foodUpdated.data.id ? f : foodUpdated.data
      )

      setFoods(foodsUpdated)
    } catch (err) {
      console.log(err)
    }
  }

  const handleEditFood = async (food: FoodProps) => {
    setEditModalOpen(true)
    setEditingFood(food)
  }

  const handleDeleteFood = async (id: number) => {
    await api.delete(`/foods/${id}`)
    const foodsFiltered = foods.filter(food => food.id !== id)
    setFoods(foodsFiltered)
  }

  return (
    <>
      <Header openModal={toggleModal} />
      <ModalAddFood
        isOpen={modalOpen}
        setIsOpen={toggleModal}
        handleAddFood={handleAddFood}
      />
      <ModalEditFood
        isOpen={editModalOpen}
        setIsOpen={toggleEditModal}
        editingFood={editingFood}
        handleUpdateFood={handleUpdateFood}
      />

      <FoodsContainer data-testid="foods-list">
        {foods &&
          foods.map(food => (
            <Food
              key={food.id}
              food={food}
              handleDelete={handleDeleteFood}
              handleEditFood={handleEditFood}
            />
          ))}
      </FoodsContainer>
    </>
  )
}
export default Dashboard
