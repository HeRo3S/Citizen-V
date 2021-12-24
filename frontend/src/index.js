import React from 'react'
import ReactDOM from 'react-dom'
import Home from './pages/home.js'
import LoginView from './pages/loginView.js'
import RegionCodeManager from './pages/regionCodeManager.js'
import AccountManager from './pages/accountManager.js'
import PopulationView from './pages/populationView.js'
import IndividualView from './pages/individualView.js'
import IndividualInput from './pages/individualInput.js'
import AnalysisView from './pages/analysisView.js'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

function App(){
    return(
        <BrowserRouter>
            <Routes>
                <Route path="/loginView" element={<LoginView />} />
                <Route path="/" element={<Home />} />
                <Route path="/regionCodeManager" element={<RegionCodeManager />} />
                <Route path="/accountManager" element={<AccountManager />} />
                <Route path="/individualView" element={<IndividualView />} />
                <Route path="/populationView" element={<PopulationView />} />
                <Route path="/analysisView" element={<AnalysisView />} />
                <Route path="/individualInput" element={<IndividualInput />} />
            </Routes>
        </BrowserRouter>
    )
}

ReactDOM.render(<>
    <App />
</>, document.getElementById('root'));