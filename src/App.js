import { Home, AddItems, Preview, Review, Test } from './page';
import { StackNavigator } from 'react-navigation';

const App = StackNavigator({    
    home: {
        screen: Home,
        navigationOptions: {
            title: 'Keyword',
            headerStyle: {
                backgroundColor: '#45aaf2',
                shadowOpacity: 0,                
                elevation: 0
            },
            headerTitleStyle: {                
                color: '#ffffff',
                fontWeight: '200',
                fontFamily: 'quicksand'
            },
            headerLeft: null
        }
    },
    additems: {
        screen: AddItems,
        navigationOptions: {
            title: 'New',
            headerStyle: {
                backgroundColor: '#45aaf2',
                shadowOpacity: 0,                
                elevation: 0
            },
            headerTitleStyle: {                
                color: '#ffffff',
                fontWeight: '200',
                fontFamily: 'quicksand'
            },            
        }
    },
    preview: {
        screen: Preview,
        navigationOptions: {
            title: 'Preview',
            headerStyle: {
                backgroundColor: '#45aaf2',
                shadowOpacity: 0,                
                elevation: 0,                
            },
            headerTitleStyle: {
                color: '#ffffff',
                fontWeight: '200',
                fontFamily: 'quicksand'                
            }
        },          
    },
    review: {
        screen: Review,
        navigationOptions: {
            title: 'Review',
            headerStyle: {
                backgroundColor: '#45aaf2',
                shadowOpacity: 0,                
                elevation: 0
            },
            headerTitleStyle: {                
                color: '#ffffff',
                fontWeight: '200',
                fontFamily: 'quicksand'
            },            
        }
    },
});

export default App;