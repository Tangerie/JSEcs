import Boid from "@components/Boid";
import Transform from "@components/Transform";
import ISystem, { SystemArchetype } from "@ecs/System";
import World from "@ecs/World";
import { randomBetween } from "core/Utility";
import { Vector2 } from "core/Vector";
import GameWorld from "game/GameWorld";


type Archetype = [Transform, Boid];

interface Flockmate {
    influence : number;
    transform : Transform;
    boid : Boid;
}

interface Flock {
    mates: Flockmate[];
    transform : Transform;
    boid : Boid;
    totals : {
        influence : number;
    },
    alignment : Vector2;
}

export default class BoidSystem implements ISystem<Archetype> {
    private static archetype : SystemArchetype = [
        Transform.ComponentType,
        Boid.ComponentType
    ];

    getArchetype() {
        return BoidSystem.archetype;
    }

    private flocks = new Array<Flock>(50);

    runAll(world : GameWorld, components : Archetype[]) {
        if(this.flocks.length != components.length) this.flocks.length = components.length;


        let i = 0;
        for(const [transform, boid] of components) {
            const flock = this.flocks[i] = this.getFlockmates(world, transform, boid, components);
            // this.drawFlockDebug(world, flock);
            boid.target_direction.SetFrom(transform.rotation);

            if(flock.mates.length > 0) {
                // boid.target_direction.Reset();

                // this.alignment(flock);
                this.cohesion(flock);
            } else {
                boid.target_direction.SetFrom(transform.rotation);
            }

            this.move(world, transform, boid);

            i++;
        }
    }

    alignment(flock : Flock) {
        for(const mate of flock.mates) {
            flock.boid.target_direction.Add(mate.transform.rotation);
        }
        flock.boid.target_direction.Normalize();
    }

    cohesion(flock : Flock) {
        const flockCenter = Vector2.Average(...flock.mates.map(x => x.transform.position));

        flock.boid.target_position.SetFrom(flockCenter);
        const angle = Vector2.AngleTo(flock.transform.position, flockCenter);
        flock.boid.target_direction.SetAngle(angle);
        flock.boid.target_direction.Normalize();
    }

    move(world : GameWorld, transform : Transform, boid : Boid) {
        let angleDiff = boid.target_direction.angle - transform.rotation.angle;

        if(angleDiff < -Math.PI) {
            angleDiff = Math.PI - angleDiff;
        } else if(angleDiff > Math.PI) {
            angleDiff = angleDiff - Math.PI;
        }

        transform.rotation.RotateBy(angleDiff * world.delta * boid.steer_speed);

        transform.velocity.SetFrom(Vector2.Scale(transform.rotation, boid.speed));
    }

    getFlockmates(world : GameWorld, transform : Transform, boid : Boid, others : Archetype[]) : Flock {
        const flock : Flock = {
            boid: boid,
            transform: transform,
            mates: [],
            totals: {
                influence: 0
            },
            alignment: Vector2.Zero
        }

        for(const [otherTransform, otherBoid] of others) {
            if(otherTransform == transform) continue;
            const dist = Vector2.SquareDistance(otherTransform.position, transform.position);
            if(dist < boid.sqrRange) {
                const m = {
                    boid: otherBoid,
                    transform: otherTransform,
                    influence: dist / boid.sqrRange
                };

                flock.mates.push(m)
                flock.totals.influence += m.influence;
            }
        }

        return flock;
    }

    drawFlockDebug(world : GameWorld, flock : Flock) {
        const ctxt = world.context;
        for(const mate of flock.mates) {
            ctxt.beginPath();

            ctxt.strokeStyle = `hsla(121, 100%, 100%, ${1 - (mate.influence)})`;

            ctxt.moveTo(flock.transform.position.x, flock.transform.position.y);
            ctxt.lineTo(mate.transform.position.x, mate.transform.position.y);

            ctxt.stroke();
        }
    }
}