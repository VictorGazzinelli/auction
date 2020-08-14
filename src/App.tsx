import React,{ createContext, useState, Dispatch } from 'react';
import styled from 'styled-components';
import GlobalStyle from './styles/global'
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import 'antd/dist/antd.css';
import Login from './pages/Login/Login';
import Auction from './pages/Auction/Auction';
import SignUp from './pages/SignUp/SignUp';

//@ts-ignore
export const GlobalContext = createContext<IGlobalContext>();

export interface ICurrentUser {
	AccountId: number;
	Username: string;
}

export interface IGlobalContext{
	currentUser: ICurrentUser | null;
	setCurrentUser: Dispatch<ICurrentUser | null>;
}

function App() {
	const [currentUser, setCurrentUser] = useState<ICurrentUser | null>(null)

  return (
	<MainWrapper>
		<GlobalStyle/>
		<GlobalContext.Provider value={{currentUser: currentUser, setCurrentUser: setCurrentUser}}>
			<BrowserRouter>
				<Switch>

					<Route path={"/login"}>
						<Login/>
					</Route>

					<Route path={"/signup"}>
						<SignUp/>
					</Route>

					{!currentUser && <Redirect to="/login"/>}

					<Route path={"/auction"}>
						<Auction/>
					</Route>

					<Redirect from='*' to="/login"/>

				</Switch>
			</BrowserRouter>
		</GlobalContext.Provider>
	</MainWrapper>
  );
}

export default App;

const MainWrapper = styled.div`
  	display:flex;
  	flex:1;
	background: white;
`
