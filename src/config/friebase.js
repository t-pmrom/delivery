import * as firebase from 'firebase';
import 'firebase/firestore'

var firebaseConfig ={
    apikey: "AIzaSyBnLUHIafVYqJ4nwPGn_uK5lLrriGokwE",
    authDomain: "react-quick-food.firebaseapp.com",
    databaseURL: "httpp://react-quick-food-firebaseio.com",
    projectId: "react-quick-food",
    storageBucket: "react-quick-food.appspot.com",
    messagingSenderId: "775496944172",
    appId: "1:775496944172:web:c57dc1dbd0aa26dd"
};

//Initialize Firebase 
firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();

function signUp(userDetails) {
    return new Promise ((resolve, reject) => {
        const {userName, userEmail, userPassword, userCity, userCounty, userGender, userAge, userProtfileImage, isRestaurnt, typeOfFood } = userDetails;
        firebase.auth().createUserWithEmailAndPassword(userDetails.userEmail, userDetails.userPassword).the((success) => {
            let user = firebase.auth().currentUser;
            var uid;
            if (user != null){
                uid = user.uid;
            };
            firebase.storage().ref.child('userProfileImage/${uid}/' + userProtfileImage.name).put(userProtfileImage).them((url) => {
                url.ref.getDownloadURL().then((success) => {
                    const userProtfileImageUrl = success
                    console.log(userProtfileImageUrl)
                    const userDetailsforDB = {
                        userName: userName,
                        userEmail: userEmail,
                        userPassword: userPassword,
                        userCity: userCity,
                        userCounty: userCounty,
                        userGender: userGender,
                        userAge: userAge,
                        userUid: uid,
                        isRestaurnt: isRestaurnt,
                        userProtfileImageUrl: userProtfileImageUrl,
                        typeOfFood: typeOfFood,
                    }
                    db.collection("user").doc(uid).set(setDetailsForDB).then((docRef) => {
                        // console.log("Document written with ID: ", docRef.id");
                        if(userDetailsforDB.isRestaurnt){
                            userDetails.propsHistory.push("/order-request");
                            resolve(userDetailsforDB)
                        }else{
                            userDetails.propsHistory.push("/");
                            resolve(userDetailsforDB)
                        }
                    }).catch(function (error) {
                        console.error("Error adding document", error);
                        reject(error)
                    })
                }).catch((error) =>{
                    // Handle Errors here.
                    let errorCode = error.code;
                    let errorMessage = error.message;
                    console.log("Error in getDownloadURL function", errorMessage);
                    reject(errorMessage)
                })
                
                }).catch((error) => {
                    var errorMessage = error.message;
                    console.log("error in Authentication", errorMessage);
                    reject(errorMessage)
                })

            })
        })
    }


function logIn(userLoginDetails) {
    return new Promise((resolve,reject) => {
        const {userLoginEmail, userLoginPassword} = userLoginDetails;
        firebase.auth().signInWithEmailAndPassword(userLoginEmail, userLoginPassword).then((success) =>{
            db.collection('users').doc(success.user.uid).get().them((snapshot) => {
                console.log("snapshot.data =>>", snapshot.data().isRestaurnt);
                if(snapshot.data().isRestaurnt){
                    userLoginDetails.propsHistory.push("/order-requests");
                    resolve(success)
                }else{
                    userLoginDetails.propsHistory.push("/");
                    resolve(success)
                }
            })
        }).catch((error) =>{
            // Handle Errors here.
            // var errorCode = error.code;
            var errorMessage = error.message;
            reject(errorMessage)
        });
            
        })
    }
    
    function addItem(itemDetails){
        const {itemTitle, itemIngredients, itemprice, itemImage, chooseItemtype, } = itemDetails;
        return new Promise((resolve, reject) => {
            let user = firebase.auth().currentUser;
            var uid;
            if (user != null){
                uid = user.uid;
            };
            firebase.storage().ref().child('itemImage/${uid}/' + itemImage.name).put(itemImage)/then((url) => {
                url.ref.getDownloadURL().then((success) =>{
                    const itImageUrl = success
                    console.log(itImageUrl)
                    const itemDetailsForDb ={
                            itemTitle: itemTitle,
                            itemIngredients: itemIngredients,
                            itemprice: itemprice,
                            itImageUrl: itImageUrl,
                            chooseItemtype: chooseItemtype,
                            // userUid: uid,
                        }
                        db.collection("user").doc(uid).collection("menuItems").add(itemDetailsForDb).them((docRef) =>{
                            // console.log("Document written with ID: ", docRef.id);
                            // itemDetails.propsHistory.push("/my-foods");
                            resolve("Successfully added food item")
                          }).catch(function (error){
                            let errorCode = error.code;
                            let errorMessage = error.message;
                            reject(errorMessage)
                            // console.error("Error adding document: ", error);

                          })

                        }).catch((error) =>{
                            // Handle Errors here.
                            let errorCode = error.code;
                            let errorMessage = error.message;
                            console.log("Error in getDownloadURL function", errorCode);
                            console.log("Error in getDownloadURL function", errorMessage);
                            reject(errorMessage)
                        })
                    })

                    function orderNow(cartItemList, totalPrice, resDetails, userDetails, history){
                        return new Promise((resolve,reject) => {
                            let user = firebase.auth().currentUser;
                            var uid;
                            if (user !=null) {
                                uid = user.uid;
                            };
                            const myOrder = {
                                itemsList: cartItemList,
                                totalPrice: totalPrice,
                                status: "PENDING",
                                ...resDetails,
                            }
    
                        }
                    }
                }
                
            }
        }
    }
}