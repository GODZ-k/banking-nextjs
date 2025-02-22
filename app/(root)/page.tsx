import HeaderBox from '@/components/HeaderBox';
import RightSidebar from '@/components/RightSidebar';
import TotalBalanceBox from '@/components/TotalBalanceBox';
import { getLoggedInUser } from '@/lib/action/user.action';


const Home = async ({ searchParams: { id, page } }: SearchParamProps) => {
  const currentPage = Number(page as string) || 1;

  const loggedIn = await getLoggedInUser()
  console.log(loggedIn)

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
            user={loggedIn.name || "Guest"}
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

      <RightSidebar
        user={loggedIn}
        transactions={""}
        banks={""}
      />
    </section>
  )
}

export default Home