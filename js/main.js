// Create application with dependency 'firebase'
var myApp = angular.module('myApp', ['firebase']);

// Bind controller, passing in $scope, $firebaseAuth, $firebaseArray, $firebaseObject
myApp.controller('twitterCtrl', function($scope, $firebaseAuth, $firebaseArray, $firebaseObject){
    // Create a variable 'ref' to reference your firebase storage
    var ref = new Firebase("http://twitter-demo-randi.firebaseio.com");

    // Create references to store tweets and users
    var tweetRef = ref.child("tweets");
    var userRef = ref.child("users");

    // Create a firebaseArray of your tweets, and store this as part of $scope
    $scope.tweets = $firebaseArray(tweetRef);
    $scope.users = $firebaseArray(userRef);

    // Create a firebaseObject of your users, and store this as part of $scope

	
    /* 
		-- Insert authentication code here
    */
    // Create authorization object that referes to firebase
    $scope.authObj = $firebaseAuth(ref);

// Test if already logged in
    var authData = $scope.authObj.$getAuth();
    if (authData) {
        $scope.userId = authData.uid;
    } 

// SignUp function
    $scope.signUp = function() {
    // Create user
        $scope.authObj.$createUser({
            email: $scope.email,
            password: $scope.password,          
        })

    // Once the user is created, call the logIn function
        .then($scope.logIn)

    // Once logged in, set and save the user data
        .then(function(authData) {
            $scope.userId = authData.uid;
            $scope.users[authData.uid] ={
                handle:$scope.handle, 
                userImage:$scope.userImage,
            }
            $scope.users.$save()
        })

    // Catch any errors
        .catch(function(error) {
            console.error("Error: ", error);
        });
    }

// SignIn function
    $scope.signIn = function() {
        $scope.logIn().then(function(authData){
            $scope.userId = authData.uid;
        })
    }

// LogIn function
    $scope.logIn = function() {
        return $scope.authObj.$authWithPassword({
            email: $scope.email,
            password: $scope.password
        })
    }

// LogOut function
    $scope.logOut = function() {
        $scope.authObj.$unauth()
        $scope.userId = false
    }

// Write an accesible tweet function to save a tweet

    $scope.tweet = function() {
        $scope.tweets.$add({
            text:$scope.newTweet,
            userId:$scope.userId,
            likes:0,
            time:Firebase.ServerValue.TIMESTAMP
        })
    }

    $scope.like = function() {
        tweet.likes ++;
        $scope.tweets.$save();
    }
});

    /* Add a new object to the tweets array using the 
        firebaseArray .$add method. Include:
        text:text in textarea,
        userId:current user id,
        likes:0,
        time:Firebase.ServerValue.TIMESTAMP 
                // this tells firebase server to save timestamp
    */
    

    /* Once the tweet is saved, reset the value 
        of $scope.newTweet to empty string */
//Saving data
//<!-- Use ng-repeat directive to repeat a div for each element in tweets -->
//<div class="tweet-box">

//..........

//<!-- Put in the twitter handle and time of tweet -->
//<span class="handle"></span>
//<span class="time"></span>

//..........

//<!-- Put in the text of the tweet -->
//<div class="tweet">                     
//</div>

//<div class="likes">
//    <!-- Show a heart icon that, when clicked, 
 //       passes your tweet to your "like" function -->
//    <i></i>
 //   <!-- Show your total number of likes -->
 //   <span></span>
//Showing tweets


	// Write an accesible tweet function to save a tweet
		
		/* Add a new object to the tweets array using the firebaseArray .$add method. Inclue:
			text:text in textarea,
			userId:current user id,
			likes:0,
			time:Firebase.ServerValue.TIMESTAMP // tells firebase server to save timestamp
		*/
		

		// Once the tweet is saved, reset the value of $scope.newTweet to empty string


	// Function to like a tweet
	

