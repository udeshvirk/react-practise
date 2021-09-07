import { useEffect, useState } from 'react';
import Card from '../UI/Card';
import styles from './AvailableMeals.module.css';
import MealItem from './MealItem/MealItem';
const AvailableMeals = () => {
    const [meals, setMeals] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState();
    useEffect(() => {
        fetchMeals().catch((error) => {
            setIsLoading(false);
            setError(error.message);
        });
    }, [])
    const fetchMeals = async () => {
        const res = await fetch('https://react-http-a3344-default-rtdb.firebaseio.com/meals.json');
        if (!res.ok) {
            throw new Error('Something went wrong!');
        }
        const data = await res.json();
        const availableMeals = [];
        for (const key in data) {
            const meal = data[key];
            availableMeals.push({
                id: key,
                name: meal.name,
                description: meal.description,
                price: meal.price
            })
        }
        setMeals(availableMeals);
        setIsLoading(false);

    };
    if (isLoading) {
        return (
            <section className={styles.loading}>
                <p>Loading....</p>
            </section>
        );
    }
    if (error) {
        return (
            <section className={styles.error}>
                <p>{error}</p>
            </section>
        );
    }
    const mealsList = meals.map(meal => <MealItem key={meal.id} id={meal.id} name={meal.name} description={meal.description} price={meal.price} />);
    return <section className={styles.meals}>
        <Card>
            <ul>
                {mealsList}
            </ul>
        </Card>
    </section>;
}

export default AvailableMeals;