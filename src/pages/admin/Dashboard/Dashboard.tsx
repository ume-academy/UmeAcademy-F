import { useEffect, useState } from 'react';

interface Props {
    
}

const Dashboard = (props: Props) => {
    const [loading, setLoading] = useState<boolean>(true);
    
        useEffect(() => {
            setTimeout(() => setLoading(false), 100000)
        },[])

    return (
        <div>
            đạt bo
        </div>
    )
}

export default Dashboard
