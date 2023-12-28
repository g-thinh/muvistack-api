import app from './app'
import logger from './utils/logger'

const PORT = process.env.PORT ?? 3000

app.listen(PORT, () => {
  logger.info(`Server is running on http://localhost:${PORT}`)
})

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  console.error('Unhandled Rejection:', err)
  // You might want to gracefully handle or log the error here
  process.exit(1)
})
