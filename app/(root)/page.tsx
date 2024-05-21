import HeaderBox from '@/components/HeaderBox'
import TotalBalanceBox from '@/components/TotalBalanceBox';
import React from 'react'

const page = () => {
  const loggedIn = { firstName: "Harshal Kahar" };
  return (
    <section className='home'>
      <div className='home-content'>
        <header className="home-header">
          <HeaderBox type="greeting" title="Welcome" user={loggedIn?.firstName || 'Guest'} subtext="Access and Manage your account & transactions efficienty." />
          <TotalBalanceBox accounts={[]} totalBanks={1} totalCurrentBalance={1234.45} />
        </header>
      </div>
    </section>
  )
}

export default page