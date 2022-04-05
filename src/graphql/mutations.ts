import {
  gql
} from "@apollo/client";

export const ADD_SONG = gql`mutation addSong($title: String!, $duration: Float!, $artist: String!, $url: String!, $thumbnail: String!) {
    insert_songs(objects: {
        title: $title,
        duration: $duration,
        artist: $artist, 
        url: $url, 
        thumbnail: $thumbnail
    }) {
        affected_rows
    }
}`
