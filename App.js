import styles from './stylesheets/styles';
import { Separator, Spacer} from './compoments/common';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { Text, SafeAreaView, ScrollView, TextInput, Button, Platform, Alert } from 'react-native';

import ShowAllPosts from './compoments/ShowAllPosts';
import ShowPost from './compoments/ShowPost';

const API_URL = 'https://fritzlim.pythonanywhere.com'; // Amend this to be your own API URL.

export default function App() {
  const [reloadIndicator, setReloadIndicator] = useState(Math.random());
  const [allPostsData, setAllPostsData] = useState({});
  const [singlePostData, setSinglePostData] = useState({});
  const [postData, setPostData] = useState({postId: 0, postTitle: '', postContent: '' });
  const [postId, setPostId] = useState(null);

  function reloadAllPosts(){
    setReloadIndicator(Math.random()); // Changes the value of reloadIndicator changes, so that useEffect() will be run.
  }

  function getAllPosts() {
    return new Promise((resolve, reject) => {
      fetch(API_URL + '/posts')
      .then(response => {
        return response.json();
      })
      .then(responseData => {
        console.log('Original data:');
        console.log(responseData);
        // // console.log('Content from the 0th element:');
        // console.log(responseData[0].content);
  
        // console.log('Itemised data:');
        // // for (var i = 0; i < responseData.length; ++i) {
        // //   console.log(responseData[i]);
        // // }
        // for (const response of responseData) { // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for...of (taken from https://www.google.com/search?q=javascript+iterate+array)
        //   console.log(response);
        // }

        resolve(responseData);
      })
    });
  }

  function readPost(id) {
    return new Promise ((resolve, reject) => { // Need to return the Promise.
      fetch(API_URL + `/posts/${id}`)
      .then((data) => {
        if (data.status === 200) { // status is OK.
          data.json()
          .then((jsonData) => {
          let jsonAsString = `{"message": "The post with id ${id} has been read", "id": ${jsonData.id}, "title": "${jsonData.title}", "content": "${jsonData.content}"}`;
          resolve(JSON.parse(jsonAsString));
          });

          // resolve(data.json()); // This will return the retrieved JSON.
        }
      });
    });
  }

  function retrieveAndShowPost(id) {
    if (id <= 0 || isNaN(id) || id === null) {
      if (Platform.OS === 'web') { // https://reactnative.dev/docs/platform-specific-code#platform-module.
      alert('Please fill in the ID');
      } else {
        Alert.alert('Blank fields', 'Please fill in the ID');
      }
      return null;
    }

    return new Promise ((resolve, reject) => { // Need to return the Promise.
      readPost(id)
      .then((data) => {
        console.log(data);
        setSinglePostData(data);
      });
    });
  }

  // const createPost = new Promise ((resolve, reject) => {
    // Code goes here for an arrow function that returns a promise.
  // });
  function createPost(title, content) {
    if (title === '' || content === '') {
      if (Platform.OS === 'web') { // https://reactnative.dev/docs/platform-specific-code#platform-module.
      alert('Please fill in both title and content');
      } else {
        Alert.alert('Blank fields', 'Please fill in both title and content');
      }
      return null;
    }

    return new Promise ((resolve, reject) => { // Need to return the Promise.
      const requestOptions = {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          title: title,
          content: content
        })
      };
  
      fetch(API_URL + '/create', requestOptions)
      .then(() => {
        resolve('A post has been created');
        reloadAllPosts();
      });
    });
  }

  function updatePost(id, title, content) {
    if (id <= 0 || isNaN(id) || id === null || title === '' || content === '') {
      if (Platform.OS === 'web') { // https://reactnative.dev/docs/platform-specific-code#platform-module.
      alert('Please fill in the ID, title, and content');
      } else {
        Alert.alert('Blank fields', 'Please fill in the ID, title, and content');
      }
      return null;
    } else {
      return new Promise ((resolve, reject) => { // Need to return the Promise.
        const requestOptions = {
          method: 'PUT',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            title: title,
            content: content
          })
        };
    
        fetch(API_URL + `/posts/${id}`, requestOptions)
        .then(() => {
          resolve(`The post with id ${id} has been updated`);
          reloadAllPosts();
        });
      });
    }
  }

  function deletePost(id) {
    if (id <= 0 || isNaN(id) || id === null) {
      if (Platform.OS === 'web') { // https://reactnative.dev/docs/platform-specific-code#platform-module.
        alert('Please fill in the ID');
        } else {
          Alert.alert('Blank field', 'Please fill in the ID');
        }
      return null;
    }

    return new Promise ((resolve, reject) => { // Need to return the Promise.
      const requestOptions = {
        method: 'DELETE'
      };
  
      fetch(API_URL + `/posts/${id}`, requestOptions)
      .then(() => {
        resolve(`The post with id ${id} has been deleted`);
        reloadAllPosts();
      });
    });
  }

  useEffect(() => {
    // **** Uncomment these function calls to demonstrate the CRUD operations. ****
    // createPost('Another Post again','Hello there again')
    // .then((data) => {
    //   console.log(data);
    //   getAllPosts();
    // });

    // readPost(1)
    // .then((data) => {
    //   console.log(data);
    //   setSinglePostData(data);
    // });

    // updatePost(1, 'An Updated Post','This post was updated')
    // .then((data) => {
    //   console.log(data);
    //   getAllPosts();
    // });

    // deletePost(1)
    // .then((data) => {
    //   console.log(data);
    //   getAllPosts();
    // });

    getAllPosts()
    .then(data => {
      console.log('Data returned by getAllPosts():');
      console.log(data);
      setAllPostsData(data);
    });
    // ****************************************************************************
  },[reloadIndicator]); // Whenever the value of reloadIndicator changes, useEffect() will be run.

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <Text style={styles.pageTitle}>Blog Post API Testing</Text>
        <Spacer />

        <Text>Create a post:</Text>
        <TextInput
          style={styles.input}
          placeholder="Title"
          onChangeText={newText => setPostData({
            ...postData,
            postTitle: newText
          })}
        />
        <TextInput
          style={styles.input}
          placeholder="Content"
          onChangeText={newText => setPostData({
            ...postData,
            postContent: newText
          })}
        />
        <Button
          title="Create Post"
          onPress={() => createPost(postData.postTitle, postData.postContent)}
        />
        <Separator />

        <Text>Retrieve a post:</Text>
        <TextInput
          style={styles.input}
          placeholder="Post ID"
          onChangeText={newText => setPostId(parseInt(newText))}
          keyboardType="number-pad"
        />
        <Button
          title="Retrieve Post"
          onPress={() => retrieveAndShowPost(postId)}
        />
        <Spacer />

        <Text>Retrieved post:</Text>
        <Text>{'\n'}</Text>
        <ShowPost data={singlePostData}></ShowPost>
        <Text>{'\n\n'}</Text>
        <Separator />

        <Text>Update a post:</Text>
        <TextInput
          style={styles.input}
          placeholder="ID"
          onChangeText={newText => setPostData({
            ...postData,
            postId: parseInt(newText)
          })}
          keyboardType="number-pad"
        />
        <TextInput
          style={styles.input}
          placeholder="Title"
          onChangeText={newText => setPostData({
            ...postData,
            postTitle: newText
          })}
        />
        <TextInput
          style={styles.input}
          placeholder="Content"
          onChangeText={newText => setPostData({
            ...postData,
            postContent: newText
          })}
        />
        <Button
          title="Update Post"
          onPress={() => updatePost(postData.postId, postData.postTitle, postData.postContent)}
        />
        <Separator />

        <Text>Delete a post:</Text>
        <TextInput
          style={styles.input}
          placeholder="ID"
          onChangeText={newText => setPostData({
            ...postData,
            postId: parseInt(newText)
          })}
          keyboardType="number-pad"
        />
        <Button
          title="Delete Post"
          onPress={() => deletePost(postData.postId)}
        />
        <Separator />

        <Text>All posts:</Text>
        <Text>{'\n'}</Text>
        <ShowAllPosts data={allPostsData}></ShowAllPosts>

        <StatusBar style="auto" />
      </ScrollView>
    </SafeAreaView>
  );
}