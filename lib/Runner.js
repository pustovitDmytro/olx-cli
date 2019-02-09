import {inspect} from 'util';
import logger from './logger';
const NS_PER_SEC = 1e9;
const MS_PER_NS = 1e-6;

function getBenchmark(time) {
    const diff = process.hrtime(time);

    return `${(diff[0] * NS_PER_SEC + diff[1])  * MS_PER_NS }ms`;
}

export default class Runner {
    constructor({
        context,
        paramsSanitizer = args => args,
        resultsSanitizer = args => args
    } = {}) {
        this.context = context;
        this.paramsSanitizer = paramsSanitizer;
        this.resultsSanitizer = resultsSanitizer;
    }

    async run(task, ...args) {
        const time = process.hrtime();

        try {
            const res = await task.apply(this.context, args);
            const benchmark = getBenchmark(time);

            logger.log('info', {
                job    : task.name,
                params : this.paramsSanitizer(args),
                result : this.resultsSanitizer(res),
                benchmark
            });

            return res;
        } catch (error) {
            const benchmark = getBenchmark(time);

            logger.log('error', {
                job    : task.name,
                params : this.paramsSanitizer(args),
                error  : inspect(error, { breakLength: 'infinity' }),
                benchmark
            });
            throw error;
        }
    }
}
