import React, {FC, useEffect} from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../RootReducer";
import http from "../../services/api";
import {Diary} from "../../Interfaces/Diary";
import {addDiary} from "../diary/diarySlice";
import Swal from "sweetalert2";
import {setUser} from "../auth/userSlice";
import DiaryTile from "../diary/DiaryTil";
import { User } from "../../Interfaces/User";
import {Route, Switch} from "react-router-dom";
import DiaryEntryList from "./DiaryEntryList";
import {useAppDispatch} from "../../store";
import dayjs from "dayjs";

const Diaries : FC = () => {
    const dispatch = useAppDispatch();
    const diary = useSelector((state: RootState) => state.diary)
    const user = useSelector((state: RootState) => state.user);

    useEffect(() => {
        const fetchDiary = async () => {
            if(user) {
                http.get<null, Diary[]>(`diary/${user.id}`).then((data) => {
                    if (data && data.length > 0){
                        const sortedbyUpdatedAt = data.sort((a,b) => {
                            return dayjs(b.updatedAt).unix() - dayjs(a.updatedAt).unix()
                        });
                        dispatch(addDiary(sortedbyUpdatedAt))
                    }
                })
            }
        }
        fetchDiary();       
    }, [dispatch, user]);

    const createDiary  = async () => {
        const Result:any = await Swal.mixin({
            input: "text",
            confirmButtonText: "Next >",
            showCancelButton: true,
            progressSteps: ["1" , "2"],
        }).queue([
            {
                titleText: "Diary Title",
                input: "text"

            },
            {
                titleText: "Private or Public Diary",
                input: "radio",
                inputOptions: {
                    private: "Private",
                    public: "Public",
                },
                inputValue: "private"
            },
        ])

        if( Result.value ){
            const {value} = Result;
            const {diary, user: _user} = await http.post<Partial<Diary>, {diary: Diary; user: User}>(`diary/`, {
                title: value[0],
                type: value[1],
                userId: user?.id,
            });
            if (diary && user){
                dispatch(addDiary([diary] as Diary[]));
                dispatch(addDiary([diary] as Diary[]));
                dispatch(setUser(_user));
                return Swal.fire({
                    titleText: "All Done",
                    confirmButtonText: "OK",
                })
            }
        }
        Swal.fire({
            titleText: "Cancelled",
        })
    }
    return (
        <div style={{padding: "1em 0.4em"}}>
            <Switch>
                <Route path = "/diary/:id">
                <DiaryEntryList/>
                </Route>
                <Route path="/">
                <button onClick={createDiary}>Create New Diary</button>
                {diary.map((diary, index) => (
                    <DiaryTile key={index} diary= {diary}/>
                ))}
                </Route>
            </Switch>
        </div>
    )
}
export default Diaries