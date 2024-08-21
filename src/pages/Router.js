import React from "react"
import { Route, Routes } from "react-router-dom"
import HomePage from "./HomePage/HomePage"
import TasksPage from "./TasksPage/TasksPage"
import ProfilePage from "./ProfilePage/ProfilePage"
import CompetitionPage from "./CompetitionPage/CompetitionPage"
import ShopPage from "./ShopPage/ShopPage"
import HabitStats from "./HabitStats/HabitStats"
import HabitLibrary from "./HabitLibrary/HabitLibrary"
import RegPage from "./RegPage/RegPage"
import LoginPage from "./LoginPage/LoginPage"
import DuelPage from "./DuelPage/DuelPage"


const Router = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <HomePage />
        }
      />
      <Route
        path="/tasks"
        element={
          <TasksPage />
        }
      />
      <Route
        path="/profile"
        element={
          <ProfilePage />
        }
      />
      <Route
        path="/competitions"
        element={
          <CompetitionPage />
        }
      />
      <Route
        path="/shop"
        element={
          <ShopPage />
        }
      />
      <Route
        path="/habitStats"
        element={
          <HabitStats />
        }
      />
      <Route
        path="/habitLibrary"
        element={
          <HabitLibrary />
        }
      />
      <Route
        path="/reg"
        element={
          <RegPage />
        }
      />
      <Route
        path="/login"
        element={
          <LoginPage />
        }
      />
      <Route
        path="/duel"
        element={
          <DuelPage />
        }
      />
    </Routes>
  )
}

export default Router