import {create} from 'zustand';
import { persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

export const authStore = create(

    persist(
        immer ((set, get) => ({

        token : null,
        userId : null,
        userName : null,
        userRole : null,

        //로그인 여부 판단 함수
        isAuthenticated : () => !!get().token,
        //권한 가져오기
        getUserRole : () => get().userRole,

        setLogin: ({token, userId, userName, userRole }) =>
            set((state) => {
                state.token = token;
                state.userId = userId;
                state.userName = userName;
                state.userRole = userRole;
        }),
        //토큰만 갱신
        setToken : (token) => 
            set((state)=>{
                state.token = token;
        }),
        //토큰 주기
        getToken : () => get().token,
        
        //정보지우기
        clearAuth: () => {
            set((state) => {
                state.token = null;
                state.userId = null;
                state.userName = null;
                state.userRole = null;
            })
            //localStorage 삭제
            authStore.persist.clearStorage();
        },
    })),
        //원하는 내용을 localstorage에 저장
        {
            name : 'auth-info',
            partialize : (state) => ({
                token : state.token,
                userId : state.userId,
                userName : state.userName,
                userRole : state.userRole
            }),

        }
    )
);