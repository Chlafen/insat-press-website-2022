import React, {useEffect, useState} from 'react';
import './index.css';
import {MdAccessAlarm, MdInsertComment} from 'react-icons/md';
import {AiFillEye} from "react-icons/ai"
import { DDMMYYYY, getAvgTimeToRead, useQuery} from '../../util/utilities';
import parse from 'html-react-parser';
import {
  FacebookShareButton, FacebookIcon,
  LinkedinShareButton, LinkedinIcon,
  RedditShareButton, RedditIcon,
  TwitterShareButton, TwitterIcon
} from "react-share";
import Category from '../../components/category/Category';
import SectionPosts from '../../components/section-posts/SectionPosts';
import Testpostframe from '../../components/post-frames/test-post-frame/TestPostFrame';

const htmlContent = `
<p><span style="font-weight: 400;">Après deux éditions qui ont connues un franc succès du fameux </span><b>NATEG Technology Day</b><span style="font-weight: 400;"> et une édition reconnue par des résultats spectaculaires du brillant </span><b>Spring Camp</b><span style="font-weight: 400;">, l’association </span><b>NATEG Tunisie</b><span style="font-weight: 400;"> est de retour pour cette année avec l’événement </span><b>NATEG Technology Camp</b><span style="font-weight: 400;"> (NATECH CAMP) qui est une fusion entre </span><b>NATEG Technology Day</b><span style="font-weight: 400;"> et </span><b>Spring Camp</b><span style="font-weight: 400;">.&nbsp;</span></p>
<p><span style="font-weight: 400;">Ouvert à tous, la première édition de cet évènement se tiendra le 14-15-16-17 Mars 2022 à hôtel VINCCI MARILLIA HAMMAMET sous un thème de l’actualité : « L’ingénierie aérospatiale ».</span></p>
<p><span style="font-weight: 400;">NATEG Technology Camp est un événement de 4 jours qui va réunir, pour sa première édition, plus de 300 participants dont la majorité sont des élèves ingénieurs de toute la Tunisie, ainsi que des chefs d’entreprises et des experts de la Tunisie et de l’Amérique du Nord.&nbsp;</span></p>
<p><span style="font-weight: 400;">En effet, cet évènement est l’occasion incontournable offerte aux étudiants, jeunes ingénieurs et entrepreneurs pour collaborer et aboutir à un changement significatif dans l’industrie tunisienne.&nbsp;</span></p>
<p><span style="font-weight: 400;">Cette année, la première édition du </span><b>NATECH CAMP</b><span style="font-weight: 400;"> sera tout à fait spéciale. Soyez au rendez-vous pour une expérience inédite et une rencontre enrichissante !</span></p>
<p><span style="font-weight: 400;">Le thème de l’évènement sera encore plus discuté par des conférenciers de haut calibre autour de deux tables rondes qui porteront sur “L’ingénierie Aérospatiale dans le monde” et “L’ingénierie Aérospatiale en Tunisie”.</span></p>
<p><span style="font-weight: 400;">Entre-temps, la journée sera rythmée par des workshops variés animés par les entreprises, des formations assurées par des experts et portant sur les «&nbsp;</span><b>soft skills&nbsp;»</b><span style="font-weight: 400;">, et qui ont pour but d’améliorer les compétences managériales et communicationnelles chez les élèves-ingénieurs.&nbsp;</span></p>
<p><span style="font-weight: 400;">Il y aura notamment des activités de réseautage afin d’assurer l’interaction entre les participants qui font partie ou non du mouvement, les entreprises et les experts présents dans l’événement.</span></p>
<p><span style="font-weight: 400;">Finalement, Il y aura un hackathon pour les participants et dont le challenge est de trouver des solutions répondant aux problèmes mentionnés dans les cahiers de charge proposés par nos chers sponsors.&nbsp;</span></p>
<p><b>NATECH CAMP</b><span style="font-weight: 400;"> comporte quatre sous compétitions liées à « L’ingénierie aérospatiale » et qui nécessitent des connaissances en : SolidWorks, Internet des objets (IOT) et l’intelligence artificielle (IA).&nbsp;</span></p>
<p><span style="font-weight: 400;">Alors c’est quoi l’ingénierie aérospatiale et pourquoi représente-elle une véritable révolution ?&nbsp;</span></p>
<p><span style="font-weight: 400;">L’aérospatial est une discipline scientifique qui rassemble les techniques de l’aéronautique et de l’astronautique. Tout comme de nombreux secteurs d’activités, celui de l’aérospatial doit s’adapter face aux enjeux du développement durable.&nbsp;</span></p>
<p><span style="font-weight: 400;">Entre innovation technologique, maîtrise des coûts et lutte contre le changement climatique, l’aérospatial doit trouver les solutions pour faire face aux enjeux énergétiques et environnementaux de demain.&nbsp;</span></p>
<p><span style="font-weight: 400;">Cette nouvelle ère présente de nouveaux défis pour les spécialistes du domaine.&nbsp;</span></p>
<p><span style="font-weight: 400;">Aujourd’hui, à chaque problème dont on fait face, les technologies aérospatiales s’annoncent toujours. Les compétences techniques et les comportements d’usage changent et évoluent.&nbsp;</span></p>
<p><span style="font-weight: 400;">Préparez-vous alors à une journée mémorable et ne ratez pas cette occasion.</span></p>`;

const postData = {
  title: 'Project Axis, a new axis newly created by IEEE INSAT',
  category: 'Football',
  timeOfPost: new Date(),
  author: 'Nessrine Baltouni',
  description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam',
  img: {
    imgUrl: 'images/post7.jpg',
    alt: 'A picture'
  },
  views: 158,
  comments: 15,
  url: '/',
  content: htmlContent,
  id: 656
}

const iconSize = 30;

export default function Article() {
  let query = useQuery(); // this is the query params
  const postId = query.get("pid");

  //get author image
  const authorImgUrl = '/images/post4.jpg'
  const PostContent = parse(postData.content);
  const moreLikeThis = [postData, postData, postData];
  
  useEffect(() => {
    let btns = document.querySelector(".react-share__ShareButton") //bug with the class
    while(btns){
      btns.classList.remove("react-share__ShareButton")
      btns = document.querySelector(".react-share__ShareButton")
    }
    btns=document.querySelector(".countset");
    console.log(btns)
  }, []);
  

  return (
    <div className="article">
      {/* facebook comments integration */}

      <div className="p-header">
        <div className="p-category-date">
          <h3 className='p-category'>{postData.category}</h3>
          <div className="p-vertical-sep"></div>
          <p className="p-time-posted">{DDMMYYYY(postData.timeOfPost)}</p>
          <div className="p-vertical-sep"></div>
          <MdAccessAlarm/>
          <p className="avg-time-to-read">{getAvgTimeToRead(postData.content)} min. read</p>
        </div>
        <div className="p-title">{postData.title}</div>
        <div className="p-author-info">
          <div className="p-author-img">
            <img src={authorImgUrl} alt={postData.author} />
          </div>
          <div className="p-author-desc">
            <p>Written by</p>
            <span className='p-author-name'>{postData.author}</span>
          </div>
        </div>
      </div>
      <div className="p-horizontal-sep"></div>
      <div className="p-image">
        <img src={postData.img.imgUrl} alt='post image' />
      </div>
      <div className="p-views-comms">
        <AiFillEye/>
        {postData.views || ''}
        <div className="vertica-sep-"></div>
        <MdInsertComment/>
        {postData.comments || ''}
      </div>
      <div className="p-horizontal-sep"></div>
      <div className="p-body-mid">
        <div className="post-content">
          {PostContent}
        </div>
        <div className="p-v-sep toggle-p"></div>

        <div className="p-text-post-list toggle-p">
          <Testpostframe postData={postData}/>
          <Testpostframe postData={postData}/>
          <Testpostframe postData={postData}/>
          <Testpostframe postData={postData}/>
          <Testpostframe postData={postData}/>
        </div>
      </div>

      <div className="shar-post">
        <p>Share:</p>
        <div className="icons-scl">
          <TwitterShareButton
            hashtags={["insatpress", postData.category]}
            url={window.location.href}
          >
            <TwitterIcon size={iconSize} />
          </TwitterShareButton>
          <FacebookShareButton
            hashtag='insatpress'
            url={window.location.href}
          >
            <FacebookIcon size={iconSize} />
          </FacebookShareButton>
          <RedditShareButton
            url={window.location.href}
          >
            <RedditIcon size={iconSize} />
          </RedditShareButton>
          <LinkedinShareButton
            url={window.location.href}
          >
            <LinkedinIcon size={iconSize} />
          </LinkedinShareButton>
        </div>
      </div>  
      <div className="comments">
        <div className="top-comment">
          <p className='comment-title'>
            The Conversation
          </p>
          <p className="comment-subtitle">Start a discussion, not a fire, Post a comment</p>
        </div>
        <div className="p-horizontal-sep" style={{height:'2px'}}></div>
        <div className="fb-comments" data-href={"https://insat-press-site.herokuapp.com/post?pid="+postId} data-width="100px" data-numposts="4"></div>
      </div>
      <div className="post-seemore">
        <Category category="SIMILAR TO THIS" isLink={false} />
      </div>

      <SectionPosts postData={moreLikeThis}/>
    </div>
  )
}
