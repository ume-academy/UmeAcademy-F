import { Tlesson } from "../interface/Tlesson";


type State = {
    lessons: Tlesson[]
}

type Action = {
    type: string;
    payload: any;
}

const lessonReducer = (state: State, action: Action) => {
    switch (action.type) {
        case 'GET_LESSONS':
            return {
                ...state,
                lessons: action.payload
            }

        case 'REMOVE_LESSON':
            return {
                ...state,
                lessons: state.lessons.filter(item => item.id !== action.payload)
            }

        case 'CREATE_LESSON':
            return {
                ...state,
                lessons: [...state.lessons, action.payload]
            }

        default:
            return state;
    }
}

export default lessonReducer