import HeaderBox from '@/components/HeaderBox'
import RightSidebar from '@/components/RightSidebar';
import TotalBalanceBox from '@/components/TotalBalanceBox';
import React from 'react'

const page = () => {
  const loggedIn = { firstName: "Harshal", lastName: "Kahar", email: "harshalskahar389@gmail.com" };
  return (
    <section className='home'>
      <div className='home-content'>
        <header className="home-header">
          <HeaderBox type="greeting" title="Welcome" user={loggedIn?.firstName || 'Guest'} subtext="Access and Manage your account & transactions efficienty." />
          <TotalBalanceBox accounts={[]} totalBanks={1} totalCurrentBalance={1234.45} />
        </header>
        recent Transaction
      </div>
      <RightSidebar user={loggedIn} transactions={[]} banks={[{ currentBalance: 125.50 }, { currentBalance: 15698.50 }]} />
    </section>
  )
}

export default page