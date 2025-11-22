
import Navbar from '@/components/admin/sidebar';



const Layout = ({children}:any) => {
    return (
        <div>
            <Navbar/>
            <div className='md:ml-64'>
            {children}
            </div>
        </div>
    );
}

export default Layout;
