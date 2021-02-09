import React, {FC, useEffect, useState} from "react";
import {useParams, Link} from "react-router-dom";
import {useSelector} from "react-redux";
import { RootState } from "../../RootReducer";
import http from "../../services/api";
import {Entry} from "../../Interfaces/Entry"
import {setEntry} from "../entry/entrySlice";
import { setCanEdit, setCurrentlyEdit} from "../entry/editiorSlice";
import dayjs from "dayjs"
import {useAppDispatch} from "../../store";


const DiaryEntryList: FC = () => {
    const { entry } = useSelector((state: RootState) => state);
    const dispatch = useAppDispatch();
    const { id } = useParams<Entry>();

    useEffect(() => {
        if (id != null){
            http
            .get<null, {entry: Entry[];}>(`/diary/entry/${id}`)
            .then(({entry: _entry}) => {
                if(_entry){
                    const sortbyLastUpdated = _entry.sort((a,b)=> {
                        return dayjs(b.updatedAt).unix() - dayjs(a.updatedAt).unix()
                    });
                    dispatch(setEntry(sortbyLastUpdated))
                }
            })
        }
    
    },[id, dispatch])

    return(
        <div className="entries">
            <header>
                <Link to="/">Go back</Link>
            </header>
            <ul>
                {entry.map((entry) => (
                    <li key={entry.id} onClick={() => {
                        dispatch(setCurrentlyEdit(entry))
                        dispatch(setCanEdit(true))
                    }}></li>
                    ))}
            </ul>
        </div>
    )

}

export default DiaryEntryList