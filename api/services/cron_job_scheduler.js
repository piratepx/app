import { CronJob } from 'cron'

import CountPruner from '#api/services/counts/count_pruner'

const cronJobs = [
  new CronJob('0 0 8 * * *', async () => {
    const pruner = new CountPruner()

    await pruner.prune()
  }),
]

function cronJobsScheduler() {
  for (const cronJob of cronJobs) {
    cronJob.start()
  }

  return cronJobs
}

export default cronJobsScheduler
