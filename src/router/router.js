import { createBrowserRouter } from "react-router";
import Layout from "../pages/Layout";
import Main from "../pages/main/Main";
import Category from "../pages/category/Category";
import BookDetail from "../pages/book/BookDetail";
import MyPage from "../pages/user/MyPage";
import MyCart from "../pages/user/MyCart";
import JoinForm from "../pages/login/JoinForm";
import LoginForm from "../pages/login/LoginForm";
import FindId from "../pages/login/FindId";
import FindPw from "../pages/login/FindPw";
import ResetPw from "../pages/login/ResetPw";
import { Component } from "react";
import MyInfoEdit from "../pages/user/MyInfoEdit";
import MyAccountDelete from "../pages/user/Withdraw";
import MyOrder from "../pages/user/MyOrder";
import SearchResult from "../pages/book/SearchResult";
import AdminDashboard from "../pages/admin/AdminDashboard";
import AdminBookManage from "../pages/admin/AdminBookManage";

export const router = createBrowserRouter([
    {
        path: '/',
        Component : Layout,
        children : [
            {
                index : true, Component : Main
            },
            {
                path: 'category', Component : Category
            },
            {
                path: 'search', Component : SearchResult
            },
            {
                path: 'book/:bookId', Component : BookDetail
            },
            {
                path: 'myPage',
                children : [
                    {index : true , Component : MyPage},
                    {path : 'edit', Component : MyInfoEdit},
                    {path : 'withdraw', Component : MyAccountDelete},
                    {path : 'myOrder', Component : MyOrder}
                ]
            },
            {
                path: 'myCart', Component : MyCart
            },
            {
                path: 'admin',
                children : [
                    {index : true , Component : AdminDashboard},
                    {path : 'book', Component : AdminBookManage}
                ]
            },
        ]
    },
    {
        path: 'join', Component : JoinForm
    },
    {
        path: 'login', Component : LoginForm
    },
    {
        path: 'findId', Component : FindId
    },
    {
        path: 'findPw', Component : FindPw
    },
    {
        path: 'resetPw', Component : ResetPw
    },
]);