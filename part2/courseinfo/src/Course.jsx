const Header = ({ course }) => {
    return (
        <>
            <h1>{course.name}</h1>
        </>
    )
}

const Part = ({ part, exercises }) => {
    return (
        <>
            <p>
                {part} {exercises}
            </p>
        </>
    )
}

const Content = ({ parts }) => {
    return (
        <>
            {parts.map((part) => (
                <Part key={part.id} part={part.name} exercises={part.exercises} />
            ))}
        </>
    )
}

const Total = ({ parts }) => {
    const total = parts.reduce((sum, cur) => sum + cur.exercises, 0)

    return (
        <>
            <p>Total of {total} exercises</p>
        </>
    )
}

const Course = ({ course }) => {
    return (
        <>
            <Header course={course} />
            <Content parts={course.parts} />
            <Total parts={course.parts} />
        </>
    )
}

export default Course