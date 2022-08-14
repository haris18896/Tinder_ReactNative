# Tinder Clone : Setting up Tailwind and react Navigation

The third package for tailwind with react-native is [tailwind-rn](https://github.com/vadimdemedes/tailwind-rn), we already have checked [tailwindcss-react-native](https://www.npmjs.com/package/tailwindcss-react-native) and its [installation](https://tailwindcss-react-native.vercel.app/installation) we have worked with `tailwindcss-react-native` package in the past `(delivroo-ReactNative)` and it is a great package. after that we have also checked [tailwind-react-native-classnames] [twrnc](https://www.npmjs.com/package/twrnc) which is far more simple and great.

now we are going to use [tailwind-rn](https://github.com/vadimdemedes/tailwind-rn) in our `Tinder Clone` projex	ct.

Run the following command to automatically add tailwind-rn to your React Native project:

```
npm install tailwind-rn
npx setup-tailwind-rn
```
Use `useTailwind` React hook and apply any of the supported utilities from Tailwind in your React Native views.

```js
import React from 'react';
import {SafeAreaView, View, Text} from 'react-native';
import {useTailwind} from 'tailwind-rn';

const Hello = () => {
	const tailwind = useTailwind();

	return (
		<SafeAreaView style={tailwind('h-full')}>
			<View style={tailwind('pt-12 items-center')}>
				<View style={tailwind('bg-blue-200 px-3 py-1 rounded-full')}>
					<Text style={tailwind('text-blue-800 font-semibold')}>
						Hello Tailwind
					</Text>
				</View>
			</View>
		</SafeAreaView>
	);
};

export default Hello;
```

---

## installing React Navigation

```
npm install @react-navigation/native
npm i react-native-screens
npm i react-native-safe-area-view react-native-safe-area-context
npm install @react-navigation/native-stack
```

and then wrap your app in `NavigationContainer`

```js
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';

export default function App() {
  return (
    <NavigationContainer>{/* Rest of your app code */}</NavigationContainer>
  );
}
```


we can wrap any component in this `NavigationContainer` and it will automatically handle the navigation.

like if we want to only change the half of the screen then we will wrap the container in `NavigationContainer`

## Native Stack

we also have to install `native-stack` so that we can use routing

```js
//HomeScreen.js
import { View, Text } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

const HomeScreen = () => {
  return (
    <SafeAreaView>
      <Text>HomeScreen</Text>
    </SafeAreaView>
  )
}

export default HomeScreen
```

```js
// StackNavigator.js
import { View, Text } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import HomeScreen from './Screens/home/HomeScreen'

const Stack = createNativeStackNavigator()

const StackNavigator = () => {
  // now it's similar to Route system in react js
  return (
    <Stack.Navigator>
      <Stack.Screen
        name='Home'
        component={HomeScreen}
        options={{
          headerShown: false
        }}
      />
    </Stack.Navigator>
  )
}

export default StackNavigator
```

```js
// App.js
import { NavigationContainer } from '@react-navigation/native'
import StackNavigator from './StackNavigator'

export default function App() {
  return (
    <NavigationContainer>
      <StackNavigator />
    </NavigationContainer>
  )
}
```

## Passing additional props​
Sometimes we might want to pass additional props to a screen. We can do that with 2 approaches:

1. Use [React context](https://reactjs.org/docs/context.html) and wrap the navigator with a context provider to pass data to the screens (recommended).
2. Use a render callback for the screen instead of specifying a component prop:
   ```js
   <Stack.Screen name="Home">
     {(props) => <HomeScreen {...props} extraData={someData} />}
   </Stack.Screen>
   ```

## Passing parameters to routes

```js
// HomeScreen
<Button
  title="Go to Details"
  onPress={() => {
    /* 1. Navigate to the Details route with params */
    navigation.navigate('Details', {
      itemId: 86,
      otherParam: 'anything you want here',
    });
  }}
/>
```

```js
// DetailsScreen.js
/* 2. Get the param */
unction DetailsScreen({ route, navigation }) {
  /* 2. Get the param */
  const { itemId, otherParam } = route.params;
  return (
	<Text>itemId: {JSON.stringify(itemId)}</Text>
    <Text>otherParam: {JSON.stringify(otherParam)}</Text>
  )
}

```

### Updating params

Screens can also update their params, like they can update their state. The `navigation.setParams` method lets you update the params of a screen.

```js
navigation.setParams({
  query: 'someText',
});
```
### Initial params
You can also pass some initial params to a screen. If you didn't specify any params when navigating to this screen, the initial params will be used. They are also shallow merged with any params that you pass. Initial params can be specified with an initialParams prop:

```js
<Stack.Screen
  name="Details"
  component={DetailsScreen}
  initialParams={{ itemId: 42 }}
/>
```

### Passing params to a previous screen
Params aren't only useful for passing some data to a new screen, but they can also be useful to pass data to a previous screen too. For example, let's say you have a screen with a create post button, and the create post button opens a new screen to create a post. After creating the post, you want to pass the data for the post back to previous screen.

To achieve this, you can use the navigate method, which acts like goBack if the screen already exists. You can pass the params with navigate to pass the data back

```js
function HomeScreen({ navigation, route }) {
  React.useEffect(() => {
    if (route.params?.post) {
      // Post updated, do something with `route.params.post`
      // For example, send the post to the server
    }
  }, [route.params?.post]);

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button
        title="Create post"
        onPress={() => navigation.navigate('CreatePost')}
      />
      <Text style={{ margin: 10 }}>Post: {route.params?.post}</Text>
    </View>
  );
}

function CreatePostScreen({ navigation, route }) {
  const [postText, setPostText] = React.useState('');

  return (
    <>
      <TextInput
        multiline
        placeholder="What's on your mind?"
        style={{ height: 200, padding: 10, backgroundColor: 'white' }}
        value={postText}
        onChangeText={setPostText}
      />
      <Button
        title="Done"
        onPress={() => {
          // Pass and merge params back to home screen
          navigation.navigate({
            name: 'Home',
            params: { post: postText },
            merge: true,
          });
        }}
      />
    </>
  );
}
```

### Passing params to nested navigators
If you have nested navigators, you need to pass params a bit differently. For example, say you have a navigator inside the Account screen, and want to pass params to the Settings screen inside that navigator. Then you can pass params as following

```js
navigation.navigate('Account', {
  screen: 'Settings',
  params: { user: 'jane' },
});
```

### Setting the header title
```js
<Stack.Screen
  name="Home"
  component={HomeScreen}
  options={{ title: 'My home' }}
/>
```

### Using params in the title
In order to use params in the title, we need to make options prop for the screen a function that returns a configuration object. It might be tempting to try to use this.props inside of options, but because it is defined before the component is rendered, this does not refer to an instance of the component and therefore no props are available. Instead, if we make options a function then React Navigation will call it with an object containing { navigation, route } - in this case, all we care about is route, which is the same object that is passed to your screen props as route prop. You may recall that we can get the params through route.params, and so we do this below to extract a param and use it as a title.

```js
<Stack.Screen
  name="Home"
  component={HomeScreen}
  options={{ title: 'My home' }}
/>
<Stack.Screen
  name="Profile"
  component={ProfileScreen}
  options={({ route }) => ({ title: route.params.name })}
/>
```

### Updating options with setOptions
It's often necessary to update the `options` configuration for the active screen from the mounted screen component itself. We can do this using `navigation.setOptions`

```js
/* Inside of render() of React class */
<Button
  title="Update the title"
  onPress={() => navigation.setOptions({ title: 'Updated!' })}
/>
```

### Adjusting header styles

There are three key properties to use when customizing the style of your header: `headerStyle, headerTintColor, and headerTitleStyle`.

1. headerStyle: a style object that will be applied to the View that wraps the header. If you set `backgroundColor` on it, that will be the color of your header.
2.  headerTintColor: the back button and title both use this property as their color. In the example below, we set the tint color to white (#fff) so the back button and the header title would be white.
3. headerTitleStyle: if we want to customize the `fontFamily, fontWeight` and other `Text` style properties for the title, we can use this to do it.

```js
<Stack.Screen
  name="Home"
  component={HomeScreen}
  options={{
    title: 'My home',
    headerStyle: {
      backgroundColor: '#f4511e',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
  }}
/>
```

### Sharing common options across screens
It is common to want to configure the header in a similar way across many screens. For example, your company brand color might be red and so you want the header background color to be red and tint color to be white. Conveniently, these are the colors we're using in our running example, and you'll notice that when you navigate to the DetailsScreen the colors go back to the defaults. Wouldn't it be awful if we had to copy the options header style properties from HomeScreen to DetailsScreen, and for every single screen component we use in our app? Thankfully, we do not. We can instead move the configuration up to the native stack navigator under the prop screenOptions


```js
<Stack.Navigator
   screenOptions={{
     headerStyle: {
       backgroundColor: '#f4511e',
     },
     headerTintColor: '#fff',
     headerTitleStyle: {
       fontWeight: 'bold',
     },
}}
>
   <Stack.Screen
     name="Home"
     component={HomeScreen}
     options={{ title: 'My home' }}
   />
 </Stack.Navigator>
```
Now, any screen that belongs to the StackScreen will have our wonderful branded styles. Surely though, there must be a way to override these options if we need to?

### Replacing the title with a custom component

Sometimes you need more control than just changing the text and styles of your title -- for example, you may want to render an image in place of the title, or make the title into a button. In these cases you can completely override the component used for the title and provide your own.

```js
function LogoTitle() {
  return (
    <Image
      style={{ width: 50, height: 50 }}
      source={require('@expo/snack-static/react-native-logo.png')}
    />
  );
}

function StackScreen() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{ headerTitle: (props) => <LogoTitle {...props} /> }}
      />
    </Stack.Navigator>
  );
}
```

### Adding a button to the header

The most common way to interact with a header is by tapping on a button either to the left or the right of the title. Let's add a button to the right side of the header (one of the most difficult places to touch on your entire screen, depending on finger and phone size, but also a normal place to put buttons).

```js
<Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerTitle: (props) => <LogoTitle {...props} />,
          headerRight: () => (
            <Button
              onPress={() => alert('This is a button!')}
              title="Info"
              color="#fff"
            />
          ),
        }}
      />
    </Stack.Navigator>
```

### Header interaction with its screen component

To be able to interact with the screen component, we need to use navigation.setOptions to define our button instead of the options prop. By using navigation.setOptions inside the screen component, we get access to screen's props, state, context etc.

```js
function StackScreen() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={({ navigation, route }) => ({
          headerTitle: (props) => <LogoTitle {...props} />,
        })}
      />
    </Stack.Navigator>
  );
}

function HomeScreen({ navigation }) {
  const [count, setCount] = React.useState(0);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Button onPress={() => setCount((c) => c + 1)} title="Update count" />
      ),
    });
  }, [navigation]);

  return <Text>Count: {count}</Text>;
}
```

### Customizing the back button​
createNativeStackNavigator provides the platform-specific defaults for the back button. On iOS this includes a label next to the button, which shows the title of the previous screen when the title fits in the available space, otherwise it says "Back".

You can change the label behavior with headerBackTitle and style it with headerBackTitleStyle [read more](https://reactnavigation.org/docs/native-stack-navigator/#headerbacktitle).

To customize the back button image, you can use headerBackImageSource [read more](https://reactnavigation.org/docs/native-stack-navigator/#headerbackimagesource).

### Overriding the back button​
The back button will be rendered automatically in a stack navigator whenever it is possible for the user to go back from their current screen — in other words, the back button will be rendered whenever there is more than one screen in the stack.

Generally, this is what you want. But it's possible that in some circumstances that you want to customize the back button more than you can through the options mentioned above, in which case you can set the headerLeft option to a React Element that will be rendered, just as we did with headerRight. Alternatively, the headerLeft option also accepts a React Component, which can be used, for example, for overriding the onPress behavior of the back button. Read more about this in the api reference.

### Nesting navigators
Nesting navigators means rendering a navigator inside a screen of another navigator, for example:
```js
function Home() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Feed" component={Feed} />
      <Tab.Screen name="Messages" component={Messages} />
    </Tab.Navigator>
  );
}

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={Home}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="Profile" component={Profile} />
        <Stack.Screen name="Settings" component={Settings} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
```

In the above example, the `Home` component contains a tab navigator. The `Home` component is also used for the `Home` screen in your stack navigator inside the `App` component. So here, a tab navigator is nested inside a stack navigator:

* Stack.Navigator
* * Home (Tab.Navigator)
* * * Feed (Screen)
* * * Messages (Screen)
* * Profile (Screen)
* * Settings (Screen)

# How nesting navigators affects the behaviour​
When nesting navigators, there are some things to keep in mind:

### Each navigator keeps its own navigation history​
For example, when you press the back button when inside a screen in a nested stack navigator, it'll go back to the previous screen inside the nested stack even if there's another navigator as the parent. 

### Each navigator has its own options​
For example, specifying a title option in a screen nested in a child navigator won't affect the title shown in a parent navigator.

### Each screen in a navigator has its own params
For example, any params passed to a screen in a nested navigator are in the route prop of that screen and aren't accessible from a screen in a parent or child navigator.

If you need to access params of the parent screen from a child screen, you can use `React Context` to expose params to children.

### Navigation actions are handled by current navigator and bubble up if couldn't be handled
For example, if you're calling `navigation.goBack()` in a nested screen, it'll only go back in the parent navigator if you're already on the first screen of the navigator. Other actions such as navigate work similarly, i.e. navigation will happen in the nested navigator and if the nested navigator couldn't handle it, then the parent navigator will try to handle it. In the above example, when calling `navigate('Messages')`, inside Feed screen, the nested tab navigator will handle it, but if you call `navigate('Settings')`, the parent stack navigator will handle it.

### Navigator specific methods are available in the navigators nested inside
For example, if you have a stack inside a drawer navigator, the drawer's openDrawer, closeDrawer, toggleDrawer methods etc. will also be available on the navigation prop in the screen's inside the stack navigator. But say you have a stack navigator as the parent of the drawer, then the screens inside the stack navigator won't have access to these methods, because they aren't nested inside the drawer.

Similarly, if you have a tab navigator inside stack navigator, the screens in the tab navigator will get the push and replace methods for stack in their navigation prop.

If you need to dispatch actions to the nested child navigators from a parent, you can use [navigation.dispatch](https://reactnavigation.org/docs/navigation-prop#dispatch)

```js
navigation.dispatch(DrawerActions.toggleDrawer());
```

### 

### 

### 

### 

### 

### 

### 

### 

### 

### 

### 

