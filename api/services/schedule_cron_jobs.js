const CronJob = require('cron').CronJob

const CountPruner = require('@/services/count_pruner')

const cronJobs = [
  new CronJob('0 0 8 * * *', async () => {
    const pruner = new CountPruner()

    await pruner.prune()
  }),
]

module.exports = () => {
  for (const cronJob of cronJobs) {
    cronJob.start()
  }

  return cronJobs
}
