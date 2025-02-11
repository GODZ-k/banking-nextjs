import HeaderBox from '@/components/HeaderBox';
import TotalBalanceBox from '@/components/TotalBalanceBox';


const Home = async ({ searchParams: { id, page } }: SearchParamProps) => {
  const currentPage = Number(page as string) || 1;
 
const accounts= [
    {
        name:"PNB",
        currentBalance:300
    },
    {
        name:"RBI",
        currentBalance:40000
    },
    {
        name:"RBI",
        currentBalance:1000
    },
    {
        name:"RBI",
        currentBalance:4232
    },
    {
        name:"RBI",
        currentBalance:2000
    },
    {
        name:"RBI",
        currentBalance:30
    },
    {
        name:"RBI",
        currentBalance:50000
    },
    {
        name:"YES",
        currentBalance:2100
    }
]


  return (
    <section className="home">
      <div className="home-content">
        <header className="home-header">
          <HeaderBox 
            type="greeting"
            title="Welcome"
            user={"Tanmay" || 'Guest'}
            subtext="Access and manage your account and transactions efficiently."
          />

          <TotalBalanceBox 
            accounts={accounts as []}
            totalBanks={3}
            totalCurrentBalance={400}
          />
        </header>

        {/* <RecentTransactions 
          accounts={accountsData}
          transactions={account?.transactions}
          appwriteItemId={appwriteItemId}
          page={currentPage}
        /> */}
      </div>

      {/* <RightSidebar 
        user={loggedIn}
        transactions={account?.transactions}
        banks={accountsData?.slice(0, 2)}
      /> */}
    </section>
  )
}

export default Home